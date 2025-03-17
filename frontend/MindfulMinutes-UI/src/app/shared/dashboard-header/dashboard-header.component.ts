import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
    userName: string = ""; // Fetch this from the backend or authentication service
    userInitials: string = "";

    constructor(private dataService: DataService, private router: Router, private location: Location) { }

    ngOnInit() {
        this.dataService.userName$.subscribe(name => {
            this.userName = name;
        });
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

    goBack() {
        this.location.back();
    }
}
