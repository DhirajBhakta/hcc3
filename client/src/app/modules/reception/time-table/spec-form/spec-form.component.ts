import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spec-form',
  templateUrl: './spec-form.component.html',
  styleUrls: ['./spec-form.component.css']
})
export class SpecFormComponent implements OnInit {

  @Input()
  spec;

  @Input()
  doctor;

  @Output()
  specDeleted  = new EventEmitter<object>();

  @Output()
  specUpdated = new EventEmitter<object>();

  constructor(private aptService: AppointmentsService) { }

  ngOnInit() {
  }

  correctTime(spec) {
    if (typeof spec.start_time === 'object') {
      spec.start_time = spec.start_time.toISOString();
    }
    if (typeof spec.end_time === 'object') {
      spec.end_time = spec.end_time.toISOString();
    }
    return spec;
  }

  addDoctor(spec) {
    spec.doctor_id = this.doctor.id;
    return spec;
  }
  updateSpec(spec) {
    console.log(spec);
    spec = this.correctTime(spec);
    spec = this.addDoctor(spec);
    this.aptService.updateSpec(spec).subscribe(response => {
      console.log(response);
      this.specUpdated.emit({spec: spec, doctor_id: this.doctor.id});
    });
  }
  createSpec(spec) {
    spec = this.correctTime(spec)
    spec = this.addDoctor(spec);
    delete spec.id;
    console.log("Seding ");
    console.log(spec);
    this.aptService.createSpec(spec).subscribe(response => {
      console.log(response);
    }, err => console.log(err));
  }
  deleteSpec(spec) {
    this.aptService.deleteSpec(spec.id).subscribe(response => {
      console.log(response);
      this.specDeleted.emit({spec_id: spec.id, doctor_id: this.doctor.id});
    });

  }
}
