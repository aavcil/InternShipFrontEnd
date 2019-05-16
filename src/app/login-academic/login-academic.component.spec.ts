import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAcademicComponent } from './login-academic.component';

describe('LoginAcademicComponent', () => {
  let component: LoginAcademicComponent;
  let fixture: ComponentFixture<LoginAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
