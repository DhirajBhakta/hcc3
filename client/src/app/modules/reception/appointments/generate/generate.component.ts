import { Component, OnInit} from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentGenerator } from './appointment-generator';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  errors;
  doctors$;
  doctorSpecMap;
  start_date;
  end_date;
  selectedSpecs = [];
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
  handleChange(event) {
    console.log(event);
    if ( event.source.checked ) {
      this.selectedSpecs.push(event.source.value);
    } else {
      this.selectedSpecs.splice(this.selectedSpecs.findIndex(x => x === event.source.value), 1);
    }
  }
  generateAppointments() {
    const specList = [];
    for (const value of this.selectedSpecs) {
      const [doctor_id, spec_id]  = value.split('|');
      specList.push(this.doctorSpecMap[doctor_id][spec_id]);
    }
    if (!this.validateInputs(specList, this.start_date, this.end_date))  {
      return;
    }
    const appointments = AppointmentGenerator.generate_appointments(specList, this.start_date, this.end_date);
    this.aptService.createAppointments(appointments)
                   .subscribe(response => console.log(response),
                              err => this.errors.push(err));

    console.log(appointments);
  }

  validateInputs(specList, start_date, end_date) {
    this.errors = [];
    if (specList.length === 0) {
      this.errors.push('No specs selected');
    }
    if (start_date === undefined) {
      this.errors.push('Start date is not selected');
    } else if ( new Date().getTime() > start_date.getTime()) {
        this.errors.push('Select start date after today');
    }

    if (end_date === undefined) {
      this.errors.push('End date is not selected');
    } else if ( new Date().getTime() > end_date.getTime()) {
      this.errors.push('Select end date after today');
    }

    if (start_date !== undefined &&  end_date !== undefined &&
        start_date.getTime() > end_date.getTime()) {
      this.errors.push('Start time has to be after end time');
    }
    return this.errors.length > 0 ? false : true;
  }
}
