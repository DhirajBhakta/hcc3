import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';
import { WorkbenchService } from '../services/workbench.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  username: string = null;
  patient_details = null;
  patientSet: Boolean;
  family: any[];

  constructor(private service: WorkbenchService) {
    this.patientSet = false;
  }

  ngOnInit() {
  }


  /*retrieve user and his entire dependants, if exists*/
  getFamily() {
    this.service.getPatient(this.username).subscribe((response) => {
      let user = response.json().person;
      this.family = user.dependants;
      this.family.unshift(user);
    });
  }

  setPatient(patient) {
    this.patient_details = patient;
    this.patientSet = true;
  }

  reset() {
    this.patientSet = false;
  }


}
