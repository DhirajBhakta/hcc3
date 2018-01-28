import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedAppointmentCardComponent } from './booked-appointment-card.component';

describe('BookedAppointmentCardComponent', () => {
  let component: BookedAppointmentCardComponent;
  let fixture: ComponentFixture<BookedAppointmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedAppointmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
