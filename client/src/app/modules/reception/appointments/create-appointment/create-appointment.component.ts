import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  success;
  errors;
  doctors$;
  selectedDoctor;
  start_time;
  end_time;
  date;
  constructor(private aptService: AppointmentsService) { }

  ngOnInit() {
    this.doctors$ = this.aptService.getDoctors();
  }

  createAppointment() {
    if (!this.validateInput()) { return; }
    const appt = new Appointment(this.selectedDoctor,
                                 this.date, this.start_time,
                                 this.end_time);
    delete appt.id;
    delete appt.spec_id;
    this.aptService.createAppointments([appt])
                   .subscribe(response =>
                      this.success = 'Appointment has successfully been made for Dr.' +
                                      ' on ' + response[0].date + ' from ' + response[0].start_time + ' to ' +
                                     this.end_time,
                      err => console.log(err));

  }
  validateInput() {
    console.log(this.selectedDoctor);
    this.errors = [];
    if (this.selectedDoctor === undefined) {
      this.errors.push('Doctor has not been selected');
    }
    if (this.start_time === undefined || this.end_time === undefined) {
      this.errors.push('Time has not been selected');
    } else if (this.start_time.getTime() > this.end_time.getTime()) {
        this.errors.push('Start time has to be before end time');
      }

    if (this.date === undefined) {
      this.errors.push('Select this.date');
    } else if (this.date.getTime() < new Date().getTime()) {
      this.errors.push('Date has to be after today');
    }

    return this.errors.length > 0 ? false : true;
  }
}
