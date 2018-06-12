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

  patient_queue: any[] = [];
  patientSet:boolean = false;
  patient;
  doctorID:number;
  labRequestFormDisplayed:boolean = false;

  constructor(private userService: UserService, private workbenchService:WorkbenchService) {
    this.doctorID = this.userService.getCurrentPerson().doctor;
    console.log('DOCC:',this.doctorID);
  }

  ngOnInit() {
    this.workbenchService.getQueue(this.doctorID).subscribe((queue)=> this.patient_queue = queue);
  }

  setPatient(person) {
    this.patient = person;
    this.patientSet = true;
  }

  displayLabRequestForm(){
    this.labRequestFormDisplayed = !this.labRequestFormDisplayed;
  }


}
