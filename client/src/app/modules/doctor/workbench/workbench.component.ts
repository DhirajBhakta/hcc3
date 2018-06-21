import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';
import { UserService } from 'app/services/user.service';
import { WorkbenchService } from '../services/workbench.service';
import { AlertsService } from '@jaspero/ng-alerts';


@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  doctor: any;
  patients_queue: any[] = [];
  currentPatient: any = null;
  indication: string = "";
  displayState: string = "HISTORY";
  bundle = {
    'specialization': 'General',
    'doctorName': 'Dr.Bhandary',
    'date': '11/15/1995',
    'indication': 'fever'
  }


  constructor(private userService: UserService, private workbenchService: WorkbenchService, private _alerts: AlertsService) {
    this.submitLabRequest = this.submitLabRequest.bind(this);
  }

  ngOnInit() {
    let person = this.userService.getCurrentPerson();
    console.log('DOC', person);
    this.workbenchService.getDoctor(person.id)
      .flatMap((doctor) => {
        this.doctor = doctor;
        return this.workbenchService.getQueue(doctor.id);
      })
      .subscribe((queue) => {
        if (this.patients_queue.length != queue.length)
          this.patients_queue = queue.sort((item => item.token))
      }
      );
  }

  setPatient(waiting_item) {
    this.currentPatient = waiting_item;
    this.displayState = "HISTORY";
  }

  isCurrentPatientSet(): boolean {
    return !(this.currentPatient == null);
  }

  setDisplayState(event) {
    this.displayState = event.value;
  }

  _isGuest(item) {
    if (item.guest)
      return true;
    return false;
  }
  _getPatientName(item) {
    if (item.patient)
      return item.patient.name;
    return item.guest.name;
  }
  _getPatientID(item) {
    if (item.patient)
      return item.patient.id;
    return item.guest.id;
  }

  submitLabRequest(filledForm) {
    let requestedTests = {
      'patient_id': this._getPatientID(this.currentPatient),
      'doctor_id': this.doctor.id
    };
    for (let property in filledForm)
      if (filledForm.hasOwnProperty(property))
        if (filledForm[property] == true)
          requestedTests[property] = 'REQUIRED';
    this.workbenchService.submitLabRequest(requestedTests).subscribe((response) => this._alerts.create('success', 'Request placed'));
  }


}
