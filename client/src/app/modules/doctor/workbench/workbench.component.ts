import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  diagnosis: string;
  patientID: string;
  patientIDSet = true;

  constructor() { }

  ngOnInit() {
  }

  setPatient() {
    this.patientIDSet = true;
    console.log(this.patientID);

  }
  unsetPatient() {
    this.patientID = null;
    this.patientIDSet = false;
  }


}
