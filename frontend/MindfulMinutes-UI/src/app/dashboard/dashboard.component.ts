import { Component } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { DashboardHeaderComponent } from '../shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, DashboardHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string = "Cibi Sharan";
}
