import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CustomModule } from '../custom.module';
import { JsonPipe } from '@angular/common';
import { Signup } from '../models/signup';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../shared/data.service';
import { AppService } from '../shared/app.service';
import { Observable } from 'rxjs';

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
    signedupUserId: string | null = '';
    userName = '';
    signupUser: Signup = { name: "", email: "", password: ""};
    isLogin: boolean = false; // Variable to toggle between signup and login forms
    dayCount!: number;

    constructor(private http: HttpClient, private router: Router, private dataService: DataService, private appService: AppService) { }

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
        this.http.post<{ message: string, username: string, userId: string }>('http://localhost:5000/api/users/register', this.signupUser).subscribe(response => {
            // Handle successful signup
            console.log('signup successful: ', response);
            this.signedupUserId = response.userId;
            this.userName = response.username;
            this.dataService.setUserId(this.signedupUserId!);
            this.dataService.setUserName(this.userName)
            this.appService.getDateCount(this.signedupUserId)
            this.router.navigate(['/dashboard']); // Replace with the actual route
        }, error => {
            // Handle error
            console.error('Signup error', error);
        });
    }

    login() {
        this.http.post<{ token: string, userId: string, username: string }>('http://localhost:5000/api/users/login', { email: this.signupUser.email, password: this.signupUser.password }).subscribe(response => {
            // Handle successful login
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            this.signedupUserId = response.userId;
            this.userName = response.username;
            this.dataService.setUserId(this.signedupUserId);
            this.dataService.setUserName(this.userName)
            this.appService.getDateCount(this.signedupUserId).subscribe(count => {
                this.dayCount = count;
                this.dataService.setDayCount(this.dayCount)
            })
            this.dataService.setDayCount(this.dayCount);
            this.router.navigate(['/dashboard']); // Replace with the actual route
        }, error => {
            // Handle error
            console.error('Login error', error);
        });
    }
}
