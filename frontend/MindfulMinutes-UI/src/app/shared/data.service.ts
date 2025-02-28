import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId = new BehaviorSubject<string | null>(null);
  private userName = new BehaviorSubject<string>('');
  private dayCount = new BehaviorSubject<number>(0)
  userId$ = this.userId.asObservable();
  userName$ = this.userName.asObservable();
  dayCount$ = this.dayCount.asObservable();

  constructor() { }

  setUserId(id: string) {
    this.userId.next(id);
  }
  setUserName(name: string) {
    this.userName.next(name);
  }
  setDayCount(dayCount: number) {
    this.dayCount.next(dayCount);
  }

  getUserId(): string | null {
    return this.userId.getValue();
  }
  getUserName(): string {
    return this.userName.getValue();
  }
  getDayCount(): number {
    return this.dayCount.getValue();
  }

}
