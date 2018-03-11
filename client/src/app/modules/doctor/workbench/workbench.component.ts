import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';
import { WorkbenchService } from '../services/workbench.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  patient_username: string = null;
  patientSet: Boolean;
  patient_details = null;

  constructor(private service: WorkbenchService) {
    this.patientSet = false;
  }

  ngOnInit() {
  }

  setPatient() {
    this.service.getPatient(this.patient_username)
      .subscribe((response) => this.patient_details = response);
    this.patientSet = true;
  }

  reset() {
    this.patient_username = null;
    this.patient_details = null;
    this.patientSet = false;
  }


}
