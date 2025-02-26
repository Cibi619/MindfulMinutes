import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  userName: string = "Cibi Sharan"; // Fetch this from the backend or authentication service
  userInitials: string = "";

  ngOnInit() {
    this.generateInitials();
  }

  generateInitials() {
    if (this.userName) {
      const nameParts = this.userName.split(" ");
      this.userInitials = nameParts
        .map(part => part[0])
        .join("")
        .toUpperCase();
    }
  }
}

