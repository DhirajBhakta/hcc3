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

  selectedDPM;
  waitingPatients$: any;
  patient_details = null;
  patientSet: Boolean;

  constructor(private userService: UserService, private wbService: WorkbenchService) {
     this.patientSet = false;
     this.waitingPatients$ = wbService.getWaitingPatients();
  }

  ngOnInit() {
  }

  setPatient() {
    const person = this.selectedDPM.patient.person;
    console.log(person);
    this.patient_details = person;
    this.wbService.setPatientID(person.id);
    this.wbService.setDpmID(this.selectedDPM.id);
    this.patientSet = true;
  }

  reset() {
    this.patientSet = false;
  }
}
