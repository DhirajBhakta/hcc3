import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  patient_username: String = null;
  patientSet:Boolean;
  constructor() {
    this.patientSet = false;
  }

  ngOnInit() {
  }

  setPatient(){
    this.patientSet = true;
  }

  reset(){
    this.patient_username = null;
    this.patientSet = false;
  }


}
