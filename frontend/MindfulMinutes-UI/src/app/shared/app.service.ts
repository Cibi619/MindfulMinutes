import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // dateCount: number = 0;
  constructor(private http: HttpClient, private router: Router) { }

  getDateCount(userId: string): Observable<number> {
    return forkJoin({
      quotes: this.http.get<any[]>(`http://localhost:5000/api/completedQuotes/${userId}`),
      breathing: this.http.get<any[]>(`http://localhost:5000/api/completedBreathingExercises/${userId}`),
      journals: this.http.get<any[]>(`http://localhost:5000/api/completedJournal/${userId}`)
    }).pipe(
      map(({ quotes, breathing, journals }) => {
        // Convert dates into day (DD) sets for fast lookup
        const quoteDays = new Set(quotes.map(q => new Date(q.date_completed).getUTCDate()));
        const breathingDays = new Set(breathing.map(b => new Date(b.date_completed).getUTCDate()));
        const journalDays = new Set(journals.map(j => new Date(j.date_completed).getUTCDate()));
  
        // Find common days where all activities are completed
        const completedAllDays = [...quoteDays]
          .filter(day => breathingDays.has(day) && journalDays.has(day))
          .sort((a, b) => a - b); // Sort numerically (by day)
  
        if (completedAllDays.length === 0) return 0; // No streak if no full days exist
  
        // Streak Calculation
        let streak = 1; // Start with 1 if at least one valid day exists
        if (completedAllDays[completedAllDays.length - 1] != Array.from(quoteDays).pop())
          streak = 0;
        else {
          for (let i = 0; i < completedAllDays.length - 1; i++) {
            if (completedAllDays[i] === completedAllDays[i + 1] - 1) {
              streak++; // Continue streak if days are consecutive
            }
            else if (completedAllDays[i] !== completedAllDays[i + 1] - 1 && i === completedAllDays.length - 2)
              streak = 1;
            else {
              streak = 0;
            }
          }
        }
        return streak;
      })
    );
  }
  
  getQuote(): Observable<any> {
    return this.http.get('http://localhost:5000/api/quotes/');
  }
  getBreathingExercise(): Observable<any> {
    return this.http.get('http://localhost:5000/api/breathingExercise/');
  }
  postJournal(user_id: string, journalData: any): Observable<any> {
    return this.http.post(`http://localhost:5000/api/completedJournal/${user_id}`, journalData);
  }
  getCompletedQuotes(user_id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/completedQuotes/${user_id}`);
  }
  getCompletedBreathingExercises(user_id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/completedBreathingExercises/${user_id}`);
  }
  markQuoteAsCompleted(user_id: string, quoteId: string, quote: string): Observable<any> {
    return this.http.post(`http://localhost:5000/api/completedQuotes/${user_id}`, { quoteId, quote }).pipe(
      tap(response => console.log(response, "-- Quote marked as completed")));
  }
  markBreathingExerciseAsCompleted(user_id: string, exercise_title: string, videoUrl: string): Observable<any> {
    return this.http.post(`http://localhost:5000/api/completedBreathingExercises/${user_id}`, {exercise_title, videoUrl }).pipe(
      tap(response => console.log(response, "-- Breathing exercise marked as completed")));
  }
}
