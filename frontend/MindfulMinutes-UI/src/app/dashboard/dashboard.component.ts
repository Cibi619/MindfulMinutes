import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { DashboardHeaderComponent } from '../shared/dashboard-header/dashboard-header.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, DashboardHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username: string = '';
  userId: string | null = null;
  constructor(private dataService: DataService) {
    console.log(this.userId, this.username, '--in constructor');
  }

  ngOnInit() {
    this.dataService.userId$.subscribe(id => {
      this.userId = id
    })

    this.dataService.userName$.subscribe(name => {
      this.username = name
    })
    console.log(this.userId, this.username);
  }


}
