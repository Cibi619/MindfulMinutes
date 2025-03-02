import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // dateCount: number = 0;
  constructor(private http: HttpClient, private router: Router) { }

  getDateCount(userId: string): Observable<number> {
    return this.http.get<any[]>(`http://localhost:5000/api/completedQuotes/${userId}`).pipe(
      tap(response => {
        console.log("Response received:", response);
      }),
      map(response => response.length) // Extracting the length
    );
  }

  getQuote(): Observable<any> {
    return this.http.get('http://localhost:5000/api/quotes/');
  }
  getBreathingExercise(): Observable<any> {
    return this.http.get('http://localhost:5000/api/breathingExercise/');
  }
  postJournal(journalData: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/journal/', journalData);
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
