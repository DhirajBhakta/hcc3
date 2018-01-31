import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dateString } from 'app/utils';
//services
import { AppointmentsService } from '../services/appointments.service';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  specialities: Set<string>;
  bookedAppointmentsData: {};
  dateMap: {};
  isLoading: boolean;

  specialitySelectionForm: FormGroup;
  dateSelectionForm: FormGroup;

  bundle = {};

  constructor(private service: AppointmentsService, private _fb: FormBuilder) {
    this.specialitySelectionForm = this._fb.group({
      speciality: ['', Validators.required],
    });
    this.dateSelectionForm = this._fb.group({
      date: ['', Validators.required],
    });
    this.dateFilter = this.dateFilter.bind(this);
  }

  ngOnInit() {
    this.isLoading = true;
    this.service.requestData();
    this.service.specialities().subscribe((specialities) => {
      this.specialities = specialities;
      this.isLoading = false
    });
    this.service.getSpecialityDatesMap().subscribe(data => { this.dateMap = new Map(data); });
    this.bookedAppointmentsData = this.service.getBookedAppointments();
  }

  onDateSubmit() {
    this.isLoading = true;
    this.service.getDoctorDetails(this.specialitySelectionForm.value.speciality, dateString(this.dateSelectionForm.value.date))
      .subscribe(data => {
        this.bundle = data[0];
        this.isLoading = false;
      });
  }

  dateFilter(d: Date): boolean {
    if (this.dateMap.get(this.specialitySelectionForm.value.speciality).indexOf(dateString(d)) == -1)
      return false;
    return true;
  }



  appointmentCancel(): void {
    console.log('appointmentcancelled lol');
  }


}
