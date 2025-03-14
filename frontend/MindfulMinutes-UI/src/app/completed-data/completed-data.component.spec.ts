import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedQuotesComponent } from './completed-data.component';

describe('CompletedQuotesComponent', () => {
  let component: CompletedQuotesComponent;
  let fixture: ComponentFixture<CompletedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
