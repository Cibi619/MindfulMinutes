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
}
