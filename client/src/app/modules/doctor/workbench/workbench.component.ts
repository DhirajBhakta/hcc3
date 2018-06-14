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
  indication:string = "";
  displayState:string = "HISTORY";
  bundle={
    'specialization':'General',
    'doctorName':'Dr.Bhandary',
    'date':'11/15/1995',
    'indication':'fever'  
  }


  constructor(private userService: UserService, private workbenchService:WorkbenchService) {

  }

  /**
  *the doctor attribute of the person is doctorID (oneToOneField mapping from person to doctor)
  */
  ngOnInit() {
    this.person = this.userService.getCurrentPerson();
    let doctorID = this.person.doctor;
    this.workbenchService.getQueue(doctorID).subscribe((queue)=> {
      if(this.patient_queue.length != queue.length)
      this.patient_queue = queue;
    });
  }

  setPatient(person) {
    this.currentPatient = person;
    this.displayState = "HISTORY";
  }

  isCurrentPatientSet():boolean{
    return !(this.currentPatient==null);
  }

  setDisplayState(event){
    this.displayState = event.value;
  }


}
