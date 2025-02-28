import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard-header',
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  userName: string = ""; // Fetch this from the backend or authentication service
  userInitials: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.userName$.subscribe(name => {
      this.userName = name;
    })
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

