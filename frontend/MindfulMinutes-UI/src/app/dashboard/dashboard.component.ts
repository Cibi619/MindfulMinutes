import { Component, OnInit, Pipe } from '@angular/core';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { DashboardHeaderComponent } from '../shared/dashboard-header/dashboard-header.component';
import { DataService } from '../shared/data.service';
import { AppService } from '../shared/app.service';
import { PopupComponent } from '../shared/popup/popup.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, DashboardHeaderComponent, NgIf, FormsModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  quoteCompletedToday: boolean = false;
  exerciseCompletedToday: boolean = false;
  journalCompletedToday: boolean = false;

  quoteData: any; exerciseData: any;
  journalEntry: string = '';
  isQuote = false; isBreathingExercise =  false; isJournal = false;
  isPopupOpen = false;
  popupTitle!: string;
  popupContent!: string;
  username: string = '';
  userId: string | null = null;
  day_count!: number;
  isQuoteFetched!: boolean;
  isExerciseFetched!: boolean;
  videoUrl!: string;
  isSidenavOpen = false;
  isShow = true;

  constructor(private dataService: DataService, private appService: AppService, private sanitizer: DomSanitizer) {
    console.log(this.userId, this.username, '--in constructor');
  }

  ngOnInit() {
    this.dataService.userId$.subscribe(id => {
      this.userId = id
    })

    this.dataService.userName$.subscribe(name => {
      this.username = name
    })

    this.dataService.dayCount$.subscribe(count => {
      this.day_count = count;
    })
    console.log(this.userId, this.username);
    this.checkCompletionStatus();
  }

  getSafeUrl(videoUrl: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  checkCompletionStatus() {
    const today = new Date().getUTCDate();

    // Checking if quote has been completed today
    this.appService.getCompletedQuotes(this.userId!).subscribe((completedQuotes: any[]) => {
      console.log(completedQuotes, "--completedQuotes")
      this.quoteCompletedToday = completedQuotes.some((q) => new Date(q.date_completed).getUTCDate() === today);
    });

    // Checking if exercise has been completed today
    this.appService.getCompletedBreathingExercises(this.userId!).subscribe((completedExercises: any[]) => {
      this.exerciseCompletedToday = completedExercises.some((e) => new Date(e.date_completed).getUTCDate() === today);
    });

    // Checking if journal has been completed today
    this.appService.getCompletedJournals(this.userId!).subscribe((completedJournals: any[]) => {
      this.journalCompletedToday = completedJournals.some((j) => new Date(j.date_completed).getUTCDate() === today);
    });
  }

  toggleSidenav() {
    this.dataService.toggleSidenav();
  }

  openPopup(type: string) {
    let apiCall;
    if (type === 'quote' && !this.quoteCompletedToday) {
      this.isQuote = true;
      this.isBreathingExercise = false;
      this.isJournal = false;
      apiCall = this.appService.getQuote();
  } else if (type === 'exercise' && !this.exerciseCompletedToday) {
      this.isQuote = false;
      this.isBreathingExercise = true;
      this.isJournal = false;
      apiCall = this.appService.getBreathingExercise();
  } else if (type === 'journal') {
      this.isQuote = false;
      this.isBreathingExercise = false;
      this.isJournal = true;
      if (this.journalCompletedToday) {
        this.popupTitle = 'Already Completed';
        this.popupContent = 'You have already completed this activity today.';
        this.isPopupOpen = true;
        this.isJournal = false;
        return;
      }
      this.isPopupOpen = true;
      // apiCall = this.appService.getJournal();
  }
  else {
      this.popupTitle = 'Already Completed';
      this.popupContent = 'You have already completed this activity today.';
      this.isPopupOpen = true;
      return;
  }
  apiCall?.subscribe((data: any) => {
    console.log(data.length, "--data");
    let randIndex = Math.floor(Math.random() * data.length);
    // this.quoteData = data;
    if (this.isQuote) {
      this.appService.getCompletedQuotes(this.userId!).subscribe((completedQuotes: any[]) => {
        const completedQuoteTexts = new Set(completedQuotes.map(q => q.quote));
        console.log(completedQuoteTexts, "--Completed Quote Texts Set");
        // Filter out completed quotes
        if (data.length === completedQuoteTexts.size) {
          this.popupTitle = 'No Quotes Found';
          this.popupContent = 'No new quotes available. Try again later!';
          this.isPopupOpen = true;
          this.isQuoteFetched = false;
          return;
        }

        let selectedQuote;
        let attempts = 0;
        const maxAttempts = data.length * 2; // Avoid infinite loops in edge cases
  
        // Select a random quote
        do {
          let randIndex = Math.floor(Math.random() * data.length);
          selectedQuote = data[randIndex];
          attempts++;
          console.log(randIndex, "--Selected Random Index Attempt:", attempts);
        } while (completedQuoteTexts.has(selectedQuote.quote_text) && attempts < maxAttempts);
      
        console.log(selectedQuote, "--Final Selected Quote");
      
        this.isPopupOpen = true;
        this.quoteData = selectedQuote;
        this.popupTitle = 'Quote of the Day';
        this.popupContent = selectedQuote?.quote_text;
        this.isQuoteFetched = true;
      }, error => {
        console.error('Error fetching completed quotes:', error);
        this.popupTitle = 'Error';
          this.popupContent = 'Error fetching completed quotes. Please try again later.';
          this.isPopupOpen = true;
      });
    }
      if (this.isBreathingExercise) {
        this.appService.getCompletedBreathingExercises(this.userId!).subscribe((completedBreathingExercises) => {
          const maxAttempts = data.length * 2; // Avoid infinite loops in edge cases
          const completedExerciseTitles = new Set(completedBreathingExercises.map((e: { exercise_title: any; }) => e.exercise_title));
          console.log(completedExerciseTitles, "--Completed Exercise Titles");
          if (data.length === completedExerciseTitles.size) {
            this.popupTitle = 'No Exercises Found';
            this.popupContent = 'No new exercises available. Try again later!';
            this.isPopupOpen = true;
            this.isExerciseFetched = false;
            return;
          }
          let selectedExercise;
          let attempts = 0;
          
          do {
            let randIndex = Math.floor(Math.random() * data.length);
            selectedExercise = data[randIndex];
            attempts++;
            console.log(randIndex, "--Selected Random Index Attempt:", attempts);
          } while (completedExerciseTitles.has(selectedExercise.exercise_title) && attempts < maxAttempts);
        
          console.log(selectedExercise, "--Final Selected Exercise");

          this.exerciseData = selectedExercise;
          this.popupTitle = this.exerciseData?.exercise_title;
          this.popupContent = this.exerciseData?.exercise_description;
          this.videoUrl = this.exerciseData?.video_url;
          this.popupContent = this.popupContent.replace(/\d+\./g, '<br>$&');
          this.isExerciseFetched = true;
          this.isPopupOpen = true;
        })
        
      }

      if (this.isJournal) {

      }
  }, error => {
    console.error(error);
  });
}

  closePopup() {
    if (this.isQuote) {
      console.log(this.quoteData, "--quoteData")
      if (!this.isQuoteFetched) {
        this.isPopupOpen = false;
        return;
      }
      this.appService.markQuoteAsCompleted(this.userId!, this.quoteData?._id, this.quoteData?.quote_text).subscribe({
        next: (data) => {
          console.log(data, "--quote marked in completed section");
          this.quoteCompletedToday = true; 
        }, error : (error) => {
          console.error(error);
        }
      })
    }
    if (this.isBreathingExercise) {
      if (!this.isExerciseFetched) {
        this.isPopupOpen = false;
        return;
      }
      console.log(this.exerciseData, "--exerciseData")
      this.appService.markBreathingExerciseAsCompleted(this.userId!, this.exerciseData?.exercise_title, this.exerciseData?.videoUrl).subscribe({
        next: (data) => {
          console.log(data, "--exercise marked in completed section");
          this.exerciseCompletedToday = true;
        }, error : (error) => {
          console.error(error);
        }
      });
    }
    this.isPopupOpen = false;
  }


  submitJournal() {
    if (!this.journalEntry.trim()) {
      alert('Please enter a journal note before submitting.');
      return;
    }

    const journal_content = { journal_content: this.journalEntry };

    this.appService.postJournal(this.userId!, journal_content).subscribe({
      next: (data: any) => {
        console.log(data, "--journal data saved");
        this.journalEntry = ''
        this.journalCompletedToday = true;
        this.closePopup();
      }, error : (err: any) => {
        console.error(err);
      }
    })
  }
}
