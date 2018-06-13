import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentSpec } from '../models/spec.model';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  selectedSpec;
  selectedDoctor;
  doctors$;
  doctorSpecMap;
  constructor(private aptService: AppointmentsService) {
    this.doctorSpecMap = {};
   }

  ngOnInit() {
    this.doctors$ = this.aptService.getDoctors();
    this.doctors$.subscribe(doctorList => doctorList.map(doctor => {
      const doctor_id = doctor.id;
      this.aptService.getSpecForDoctor(doctor_id).subscribe((spec) => {
        this.doctorSpecMap[doctor_id] = spec;
      });
    }));
  }
  addSpec(doctor) {
    const doctor_id = doctor.id;
    const newSpec = new AppointmentSpec();
    this.doctorSpecMap[doctor_id].push(newSpec);
    this.selectedSpec = newSpec;
    this.selectedDoctor = doctor;
  }
  handleSpecDeleted(event) {
    const spec_id = event.spec_id;
    const doctor_id = event.doctor_id;

    this.doctorSpecMap[doctor_id] =
                      this.doctorSpecMap[doctor_id].filter(spec =>
                                                           spec.id !== spec_id);
    this.selectedSpec = null;
    this.selectedDoctor = null;
  }
  handleSpecUpdated(event) {
    const spec_id = event.spec.id;
    const doctor_id = event.doctor_id;

    const replaceIndex = this.doctorSpecMap[doctor_id].findIndex(spec => spec.id === spec_id);

    this.doctorSpecMap[replaceIndex] = event.spec;

  }
  printDoc(doctor) {
    console.log(doctor);
  }
}
