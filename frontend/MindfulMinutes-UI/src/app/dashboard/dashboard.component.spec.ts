import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataService } from '../shared/data.service';
import { AppService } from '../shared/app.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

// Mock Data
const mockCompletedQuotes = [
  { date_completed: '2025-03-20', day_number: 'Day 1', quote: 'Test Quote', user_id: '123' }
];
const mockCompletedExercises = [
  { date_completed: '2025-03-21', day_number: 'Day 2', exercise_title: 'Test Exercise', user_id: '123' }
];
const mockCompletedJournals = [
  { date_completed: '2025-03-22', day_number: 'Day 3', journal_content: 'Test Journal', user_id: '123' }
];

// Mock Services
class MockDataService {
  userId$ = of('123');
  userName$ = of('Test User');
  dayCount$ = of(1);
  sidenavState$ = of(false); // Mock sidenavState$
  toggleSidenav = jasmine.createSpy('toggleSidenav');
  setCompletedDataState = jasmine.createSpy('setCompletedDataState');
}

class MockAppService {
  getCompletedQuotes = jasmine.createSpy('getCompletedQuotes').and.returnValue(of(mockCompletedQuotes));
  getCompletedBreathingExercises = jasmine.createSpy('getCompletedBreathingExercises').and.returnValue(of(mockCompletedExercises));
  getCompletedJournals = jasmine.createSpy('getCompletedJournals').and.returnValue(of(mockCompletedJournals));
  getQuote = jasmine.createSpy('getQuote').and.returnValue(of([{ quote_text: 'Test Quote' }]));
  getBreathingExercise = jasmine.createSpy('getBreathingExercise').and.returnValue(of([{ exercise_title: 'Test Exercise', exercise_description: 'Test Description', video_url: 'test-url' }]));
  markQuoteAsCompleted = jasmine.createSpy('markQuoteAsCompleted').and.returnValue(of({}));
  markBreathingExerciseAsCompleted = jasmine.createSpy('markBreathingExerciseAsCompleted').and.returnValue(of({}));
  postJournal = jasmine.createSpy('postJournal').and.returnValue(of({}));
  getDateCount = jasmine.createSpy('getDateCount').and.returnValue(of(1));
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

// Mock SidenavComponent
@Component({ selector: 'app-sidenav', template: '', standalone: true })
class MockSidenavComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataService: DataService;
  let appService: AppService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, FormsModule, NgIf, NgClass, MockSidenavComponent], // Add MockSidenavComponent to imports
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: AppService, useClass: MockAppService },
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and components
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    expect(component.userId).toBe('123');
    expect(component.username).toBe('Test User');
    expect(component.day_count).toBe(1);
  });

  it('should check completion status on initialization', () => {
    expect(appService.getCompletedQuotes).toHaveBeenCalledWith('123');
    expect(appService.getCompletedBreathingExercises).toHaveBeenCalledWith('123');
    expect(appService.getCompletedJournals).toHaveBeenCalledWith('123');
  });

  // it('should open quote popup and call getQuote', () => {
  //   // Ensure the quote is not already completed
  //   component.quoteCompletedToday = false;

  //   // Call the method
  //   component.openPopup('quote');

  //   // Verify the service method was called
  //   expect(appService.getQuote).toHaveBeenCalled();

  //   // Verify the popup state
  //   expect(component.isPopupOpen).toBeTrue();
  //   expect(component.popupTitle).toBe('Quote of the Day');
  //   expect(component.popupContent).toBe('Test Quote');
  // });

  // it('should open exercise popup and call getBreathingExercise', () => {
  //   // Ensure the exercise is not already completed
  //   component.exerciseCompletedToday = false;

  //   // Call the method
  //   component.openPopup('exercise');

  //   // Verify the service method was called
  //   expect(appService.getBreathingExercise).toHaveBeenCalled();

  //   // Verify the popup state
  //   expect(component.isPopupOpen).toBeTrue();
  //   expect(component.popupTitle).toBe('Test Exercise');
  //   expect(component.popupContent).toBe('Test Description');
  // });

  it('should open journal popup', () => {
    // Ensure the journal is not already completed
    component.journalCompletedToday = false;

    // Call the method
    component.openPopup('journal');

    // Verify the popup state
    expect(component.isPopupOpen).toBeTrue();
    expect(component.isJournal).toBeTrue();
  });

  // it('should close popup and mark quote as completed', () => {
  //   // Simulate opening the quote popup
  //   component.openPopup('quote');

  //   // Close the popup
  //   component.closePopup();

  //   // Verify the service method was called
  //   expect(appService.markQuoteAsCompleted).toHaveBeenCalledWith('123', '', 'Test Quote');

  //   // Verify the completion status
  //   expect(component.quoteCompletedToday).toBeTrue();
  // });

  // it('should close popup and mark exercise as completed', () => {
  //   // Simulate opening the exercise popup
  //   component.openPopup('exercise');

  //   // Close the popup
  //   component.closePopup();

  //   // Verify the service method was called
  //   expect(appService.markBreathingExerciseAsCompleted).toHaveBeenCalledWith('123', 'Test Exercise', '');

  //   // Verify the completion status
  //   expect(component.exerciseCompletedToday).toBeTrue();
  // });

  it('should submit journal entry', () => {
    // Set the journal entry
    component.journalEntry = 'Test Journal Entry';

    // Submit the journal
    component.submitJournal();

    // Verify the service method was called
    expect(appService.postJournal).toHaveBeenCalledWith('123', { journal_content: 'Test Journal Entry' });

    // Verify the completion status
    expect(component.journalCompletedToday).toBeTrue();
  });

  it('should toggle sidenav', () => {
    // Toggle the sidenav
    component.toggleSidenav();

    // Verify the service method was called
    expect(dataService.toggleSidenav).toHaveBeenCalled();
  });

  // it('should celebrate when all tasks are completed', () => {
  //   // Simulate completing all tasks
  //   component.quoteCompletedToday = true;
  //   component.exerciseCompletedToday = true;
  //   component.journalCompletedToday = true;

  //   // Close the popup
  //   component.closePopup();

  //   // Verify the celebration state
  //   expect(component.isAllCompleted).toBeTrue();
  // });
});