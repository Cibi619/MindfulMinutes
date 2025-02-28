import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { DashboardHeaderComponent } from '../shared/dashboard-header/dashboard-header.component';
import { DataService } from '../shared/data.service';
import { AppService } from '../shared/app.service';
import { PopupComponent } from '../shared/popup/popup.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, DashboardHeaderComponent, NgIf, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  journalEntry: string = '';
  isQuote = false; isBreathingExercise =  false; isJournal = false;
  isPopupOpen = false;
  popupTitle!: string;
  popupContent!: string;
  username: string = '';
  userId: string | null = null;
  constructor(private dataService: DataService, private appService: AppService) {
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

  openPopup(type: string) {
    let apiCall;
    if (type === 'quote') {
      this.isQuote = true;
      this.isBreathingExercise = false;
      this.isJournal = false;
      apiCall = this.appService.getQuote();
  } if (type === 'exercise') {
      this.isQuote = false;
      this.isBreathingExercise = true;
      this.isJournal = false;
      apiCall = this.appService.getBreathingExercise();
  } if (type === 'journal') {
      this.isQuote = false;
      this.isBreathingExercise = false;
      this.isJournal = true;
      this.isPopupOpen = true;
      // apiCall = this.appService.getJournal();
  }
  apiCall?.subscribe((data: any) => {
    console.log(data.length, "--data");
    let randIndex = Math.floor(Math.random() * data.length)
    console.log(randIndex, "--randIndex")
    // this.popupContent = data;
    this.isPopupOpen = true;
    if (this.isQuote) {
      this.popupTitle = 'Quote of the Day';
      this.popupContent = data[randIndex]?.quote_text;
    }
    if (this.isBreathingExercise) {
      this.popupTitle = data[randIndex]?.exercise_title;
      this.popupContent = data[randIndex]?.exercise_description;
      this.popupContent = this.popupContent.replace(/\d+\./g, '<br>$&');
    }
  }, error => {
    console.error(error)
  })
    
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  submitJournal() {
    if (!this.journalEntry.trim()) {
      alert('Please enter a journal note before submitting.');
      return;
    }

    const journalData = { entry_text: this.journalEntry };

    this.appService.postJournal(journalData).subscribe({
      next: (data: any) => {
        console.log(data, "--journal data saved");
        this.journalEntry = ''
        this.closePopup();
      }, error : (err: any) => {
        console.error(err);
      }
    })
  }
}
