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
  /**
  *"person" here ,is doctor himself (currently loggedIN person)
  */
  person:any;
  patient_queue: any[] = [];
  currentPatient:any = null;

  labRequestFormDisplayed:boolean = false;

  constructor(private userService: UserService, private workbenchService:WorkbenchService) {
    this.person = this.userService.getCurrentPerson();

  }

  /**
  *the doctor attribute of the person is doctorID (oneToOneField mapping from person to doctor)
  */
  ngOnInit() {
    let doctorID = this.person.doctor;
    this.workbenchService.getQueue(doctorID).subscribe((queue)=> {
      if(this.patient_queue.length != queue.length)
      this.patient_queue = queue;
    });
  }

  setPatient(person) {
    this.currentPatient = person;
  }
  isCurrentPatientSet():boolean{
    return !(this.currentPatient==null);
  }

  displayLabRequestForm(){
    this.labRequestFormDisplayed = !this.labRequestFormDisplayed;
  }


}
