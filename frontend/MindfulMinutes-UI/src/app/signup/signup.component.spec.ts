import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between login and signup', () => {
    component.isLogin = false;
    component.toggleForm();
    expect(component.isLogin).toBe(true);
  });

  it('should call signup when isLogin is false', () => {
    spyOn(component, 'signup');
    component.isLogin = false;
    component.onSubmit();
    expect(component.signup).toHaveBeenCalled();
  });

  it('should call login when isLogin is true', () => {
    spyOn(component, 'login');
    component.isLogin = true;
    component.onSubmit();
    expect(component.login).toHaveBeenCalled();
  });
});
