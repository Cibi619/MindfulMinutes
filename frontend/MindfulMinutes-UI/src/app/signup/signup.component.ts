import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CustomModule } from '../custom.module';
import { JsonPipe } from '@angular/common';
import { Signup } from '../models/signup';

@Component({
  selector: 'app-signup',
  imports: [
    HeaderComponent,
    CustomModule,
    JsonPipe
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupUser: Signup = { name: "Cibi", email: "cibi.mit@gmail.com", password: "Cibi@619"}
}
