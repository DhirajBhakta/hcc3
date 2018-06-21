import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {

  doctors$;
  doctorApptMap;
  objectKeys  = Object.keys;

  success;

  constructor(private aptService: AppointmentsService) {
    this.doctorApptMap = {};
  }

  handleDeletedAppointment() {
    this.success = 'Appointment has been deleted successfully';
    setTimeout(() => this.success = null, 5000);
  }

  sortByDate(appt) {
    appt.sort(function(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return appt;
  }
  getMonthName(date) {
    return new Date(date).toLocaleString('en-IN', {month : 'long'});
  }
  groupByMonth(appts) {
    const monthMap = {};
    appts = this.sortByDate(appts);
    for (const appt of appts ) {
      const m = this.getMonthName(appt.date);
      if (monthMap[m] === undefined) {
        monthMap[m] = [];
      }
      monthMap[m].push(appt);
    }
    return monthMap;
  }
  ngOnInit() {
    this.doctors$ = this.aptService.getDoctors();
    this.doctors$.subscribe(doctorList => doctorList.map(doctor => {
      const doctor_id = doctor.id;
      this.aptService.getAppointmentWithParams({'doctor': doctor_id}).subscribe((appt) => {
        this.doctorApptMap[doctor_id] = this.groupByMonth(appt);
      });
    }));
  }
}
