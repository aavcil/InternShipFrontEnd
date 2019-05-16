/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecourseComponent } from './Recourse.component';

describe('RecourseComponent', () => {
  let component: RecourseComponent;
  let fixture: ComponentFixture<RecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
