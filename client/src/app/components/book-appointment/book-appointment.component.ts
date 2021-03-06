import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { AppointmentsService } from '../../modules/reception/services/appointments.service';
import { Slot } from '../../modules/reception/models/slot.model';

import { timeDisp, dateDisp } from '../../constants';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  @Output()
  slotBooked = new EventEmitter();

  // for show-errors component
  success;
  errors;

  // data for input/output
  doctors;
  appointments = [];
  specializations;

  // data to get member of family
  enteredId;
  family;
  patient;

  // maps for fast access
  specDocMap = {};
  specDateMap = {};

  // storing selected values
  selectedSpec;
  selectedDate;
  selectedAppointment;
  booking_status;

  // processing data
  filtered_appointments = [];
  valid_dates = [];

  currentPerson;
  currentUser;
  currentUserType;

  objectKeys = Object.keys;
  constructor(private userService: UserService,
             private aptService: AppointmentsService) {
               const userGetter = userService.getCurrentUser();
               userGetter.subscribe(data => {
                  this.currentUser = data;
                  this.currentUserType = data.groups[0].name;
                  if (this.currentUserType === 'PATIENT') {
                    this.enteredId = data.username;
                    this.getFamily();
                    this.booking_status = 'UC';
                  }
               });
             }

  ngOnInit() {
    const getDoctors = this.aptService.getDoctors();
    getDoctors.subscribe( response => { this.doctors = response; });
    getDoctors.subscribe(doctorList => doctorList.map(doctor => {
      const doctor_id = doctor.id;

      if (this.specDocMap[doctor.specialization] === undefined) {
        this.specDocMap[doctor.specialization] = [];
      }

      this.specDocMap[doctor.specialization].push(doctor);

      this.aptService.getAppointmentWithParams({'doctor': doctor_id}).subscribe((appt) => {
        this.appointments.push(...appt);

        if (this.specDateMap[doctor.specialization] === undefined) {
          this.specDateMap[doctor.specialization] = [];
        }

        this.specDateMap[doctor.specialization].push(...appt.map( x => x.date));
      });
    }));
  }

  showUserSelect() {
    return this.currentUserType === 'RECEPTIONIST' &&
           (this.family === undefined || this.family.length === 0);
  }
  createSlot() {
    const appointmentData = this.filtered_appointments
                              .find(appt =>
                                appt.id === this.selectedAppointment);
    const newSlot = new Slot(this.booking_status, this.patient.id,
                              this.selectedAppointment);
    this.aptService.createSlot(newSlot)
      .subscribe(response => {
                 console.log(response);
                 this.success = 'Apopintment has been booked for ' + this.patient.name +
                  ' on ' + this.selectedDate.toLocaleDateString('en-US', dateDisp) + ' at ' +
                  this.selectedDate.toLocaleTimeString('en-US', timeDisp);
                  this.slotBooked.emit({'slot': newSlot,
                    'appointment': appointmentData,
                    'doctor': this.getDoctor(appointmentData.doctor_id)});
                 },
                 err => {
                   console.log(err);
                   this.errors = ['Some error occured trying to create slot'];
                  });

  }

  getDoctor(id) {
    return this.doctors.find( x => x.id === id);
  }
  equalDates(date1: Date, date2: Date) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    console.log(d1, d2);
    return (d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    }
  generateResults() {
    const doctors = this.specDocMap[this.selectedSpec];
    const doctor_ids = doctors.map(x => x.id);
    this.filtered_appointments = [];

    for (const appt of this.appointments) {
      if (this.equalDates(this.selectedDate, appt.date) &&
          doctor_ids.includes(appt.doctor_id)) {
            this.filtered_appointments.push(appt);
      }
    }
    console.log(this.filtered_appointments);

  }

  generateValidDates() {
    this.valid_dates = this.specDateMap[this.selectedSpec].map(x => {
      const y = new Date(x);
      y.setHours(0, 0, 0, 0);
      return y.toISOString();
    });
  }
  dateFilter(date: Date): boolean {

    date.setHours(0, 0, 0, 0);
    const date_string = date.toISOString();

    for (const valid_date of this.valid_dates) {
      if (date_string === valid_date) {
        return true;
      }
    }
    return false;
  }

  log() {
    console.log(this.specDocMap);
    console.log(this.specDateMap);
  }
  getFamily() {
    const familyGetter = this.userService.getFamily(this.enteredId)
                          .catch(err => {
                                      console.log(err);
                                      this.errors = ['Entered id is not valid'];
                                      return Observable.of([]); });
    familyGetter.subscribe(data => {
      this.family = data;
      this.errors = [];
    });
  }

}
