import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Signup } from './models/signup';
import { SignupComponent } from './signup/signup.component';
import { CompletedQuotesComponent } from './completed-data/completed-data.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'completedData', component: CompletedQuotesComponent}
];
