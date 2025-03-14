import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AppService } from '../shared/app.service';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../shared/header/header.component';
import { DashboardHeaderComponent } from '../shared/dashboard-header/dashboard-header.component';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface CompletedQuote {
  date_completed: string,
  day_number: string,
  quote: string,
  user_id: string
}
interface CompletedExercise {
  date_completed: string,
  day_number: string,
  exercise_title: string,
  user_id: string
}
interface CompletedJournal {
  date_completed: string,
  day_number: string,
  journal_content: string,
  user_id: string
}

@Component({
  selector: 'app-completed-data',
  imports: [SidenavComponent, DashboardHeaderComponent, NgClass, NgIf, NgFor],
  templateUrl: './completed-data.component.html',
  styleUrl: './completed-data.component.css'
})

export class CompletedQuotesComponent {
    isSidenavOpen = false;
    userId!: string | null;
    completedQuotesData: CompletedQuote[] = [];
    completedDataState!: string | null;
    completedBreathingExercisesData: CompletedExercise[] = [];
    completedJournalsData: CompletedJournal[] = [];

    constructor(private dataService: DataService, private appService: AppService) {}
    ngOnInit(): void {
      this.dataService.completedDataState$.subscribe(state => {
        this.completedDataState = state;
      })
      this.dataService.userId$.subscribe(id => {
        this.userId = id;
      })
      this.appService.getCompletedQuotes(this.userId!).subscribe(data => {
        console.log(data, "--> completedquotes data..");
        this.completedQuotesData = data;
      })
      this.appService.getCompletedBreathingExercises(this.userId!).subscribe(data => {
        console.log(data, "--> completed breathing exercises data..");
        this.completedBreathingExercisesData = data;
      })
      this.appService.getCompletedJournals(this.userId!).subscribe(data => {
        console.log(data, "--> completed journals data..");
        this.completedJournalsData = data;
      })
      console.log(this.completedDataState, "--> completed data state");
    }

    toggleSidenav() {
      this.dataService.toggleSidenav();
    }
}
