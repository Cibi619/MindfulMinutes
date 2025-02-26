import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CustomModule } from '../custom.module';
import { JsonPipe } from '@angular/common';
import { Signup } from '../models/signup';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HeaderComponent,
    CustomModule,
    JsonPipe,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupUser: Signup = { name: "", email: "", password: ""};
    isLogin: boolean = false; // Variable to toggle between signup and login forms

    constructor(private http: HttpClient, private router: Router) {}

    toggleForm() {
        this.isLogin = !this.isLogin; // Method to toggle the form
    }

    onSubmit() {
        if (this.isLogin) {
            this.login();
        } else {
            this.signup();
        }
    }

    signup() {
        this.http.post('http://localhost:5000/api/users/register', this.signupUser).subscribe(response => {
            // Handle successful signup
            this.router.navigate(['/dashboard']); // Replace with the actual route
        }, error => {
            // Handle error
            console.error('Signup error', error);
        });
    }

    login() {
        this.http.post<{ token: string, userId: string }>('http://localhost:5000/api/users/login', { email: this.signupUser.email, password: this.signupUser.password }).subscribe(response => {
            // Handle successful login
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']); // Replace with the actual route
        }, error => {
            // Handle error
            console.error('Login error', error);
        });
    }
}
