import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
    day_count = 5;
    isSidenavOpen = false;

    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.dataService.dayCount$.subscribe(count => {
        this.day_count = count;
      })
      this.dataService.sidenavState$.subscribe(state => {
        this.isSidenavOpen = state;
      })
    }
}
