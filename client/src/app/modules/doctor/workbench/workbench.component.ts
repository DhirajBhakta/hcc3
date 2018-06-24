import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../models/prescription.model';
import { UserService } from 'app/services/user.service';
import { WorkbenchService } from '../services/workbench.service';
import { AlertsService } from '@jaspero/ng-alerts';

import * as moment from 'moment';

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
  patienthistory$;
  labreports$;

  constructor(private userService: UserService, private workbenchService: WorkbenchService, private _alerts: AlertsService) {
    this.submitLabRequest = this.submitLabRequest.bind(this);
  }

  ngOnInit() {
    this.workbenchService.getDoctor()
      .flatMap((doctor) => {
        this.doctor = doctor;
        return this.workbenchService.getQueue(doctor.id);
      })
      .subscribe((queue) => {
        if (this.patients_queue.length != queue.length)
          this.patients_queue = queue.sort((item => item.token))
          console.log(this.patients_queue);
      }
      );
  }

  setPatient(waiting_item) {
    this.currentPatient = waiting_item;
    if (!this._isGuest(waiting_item)) {
      this.patienthistory$ = this.workbenchService.getPatientHistory(this.currentPatient.patient.id);
      this.labreports$ = this.workbenchService.getLabReports(this.currentPatient.patient.id);
    }
    this.displayState = "HISTORY";

  }

  reset() {
    this.currentPatient = null;
    this.indication = "";
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
  _getPateintType(item){
    if(item.patient)
      return item.patient.patient_type;
    return "GUEST";
  }
  _getPatientID(item) {
    if (item.patient)
      return item.patient.id;
    return item.guest.id;
  }

  /**
  *This function will be passed as an @Input() param to LabRequest Component
  */
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

  completeDiagnosis() {
    if (this._isGuest(this.currentPatient))
      this.workbenchService.popQueue(this.currentPatient.id).subscribe((response) => { this.reset(); this._alerts.create("success","Guest patients details are NOT recorded");});

    else
      this.workbenchService.submitDiagnosis(this.doctor.id, this.currentPatient.patient.id, this.indication)
                            .flatMap((response) => this.workbenchService.popQueue(this.currentPatient.id))
                            .subscribe((response) => { this.reset(); this._alerts.create("success", "Submitted!") });

  }


    getAge(dob){
        if(dob)
         return moment().diff(dob, 'years');
        return "";
    }

}
