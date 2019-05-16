/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InternShipComponent } from './InternShip.component';

describe('InternShipComponent', () => {
  let component: InternShipComponent;
  let fixture: ComponentFixture<InternShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
