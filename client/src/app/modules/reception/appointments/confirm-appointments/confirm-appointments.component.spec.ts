import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAppointmentsComponent } from './confirm-appointments.component';

describe('ConfirmAppointmentsComponent', () => {
  let component: ConfirmAppointmentsComponent;
  let fixture: ComponentFixture<ConfirmAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
