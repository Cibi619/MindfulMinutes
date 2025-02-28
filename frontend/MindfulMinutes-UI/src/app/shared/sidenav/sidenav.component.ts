import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidenav',
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
    day_count = 5;
    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.dataService.dayCount$.subscribe(count => {
        this.day_count = count;
      })
    }
}
