import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';
import {UserService} from 'app/services/user.service';
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

  constructor(private userService: UserService) {
    this.patientSet = false;
  }

  ngOnInit() {
  }


  /*retrieve user and his entire dependants, if exists*/
  getFamily() {
    this.userService.getUser(this.username).subscribe((response) => {
      let patron = response.json().person;
      this.family = patron.dependants;
      this.family.unshift(patron);
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
