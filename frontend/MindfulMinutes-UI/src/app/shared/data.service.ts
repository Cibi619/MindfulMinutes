import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userId = new BehaviorSubject<string | null>(null);
  private userName = new BehaviorSubject<string>('');
  private dayCount = new BehaviorSubject<number>(0)
  private sidenavState = new BehaviorSubject<boolean>(false);
  private completedDataState = new BehaviorSubject<string | null>(null);
  userId$ = this.userId.asObservable();
  userName$ = this.userName.asObservable();
  dayCount$ = this.dayCount.asObservable();
  sidenavState$ = this.sidenavState.asObservable();
  completedDataState$ = this.completedDataState.asObservable();

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
  setCompletedDataState(state: string) {
    this.completedDataState.next(state);
  }
  getCompletedDataState(): string | null {
    return this.completedDataState.getValue();
  }
  toggleSidenav() {
    this.sidenavState.next(!this.sidenavState.value);
  }
}
