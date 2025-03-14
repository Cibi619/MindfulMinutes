import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
    day_count = 5;
    isSidenavOpen = false;

    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit() {
      this.dataService.dayCount$.subscribe(count => {
        this.day_count = count;
      })
      this.dataService.sidenavState$.subscribe(state => {
        this.isSidenavOpen = state;
      })
    }

    openCompletedQuotes() {
      this.router.navigate(['/completedData']);
      this.dataService.setCompletedDataState('quotes');
    }
    openCompletedExercises() {
      this.router.navigate(['/completedData']);
      this.dataService.setCompletedDataState('exercises');
    }
    openCompletedJournals() {
      this.router.navigate(['/completedData']);
      this.dataService.setCompletedDataState('journals')
    }
}
