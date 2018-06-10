import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GreeterService } from '../services/greeter.service';
import { AlertsService } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {

  username: string = null;
  patient_details = null;
  patientSet: Boolean;
  family: any[];
  loggedUsers$: any;
  selectedDoctor: any;

  constructor(private greeterService: GreeterService,
              private userService: UserService,
              private _alerts: AlertsService
            ) {
    this.patientSet = false;
    this.loggedUsers$ = greeterService.getLoggedUsers();
  }

  /*retrieve user and his entire dependants, if exists*/
  getFamily() {
    this.userService.getUser(this.username).subscribe((response) => {
      const patron = response.json().person;
      this.family = patron.dependants;
      this.family.unshift(patron);
    });
  }

  setPatient(person) {
    this.patient_details = person;
    this.patientSet = true;
  }


  /**
   * This function will send the mapping between patient and doctor to the server. Uses parameters from component.
   *
   * @memberof GreeterComponent
   */
  submitSelection() {
    const p_id = this.patient_details.user;
    const d_id = this.selectedDoctor;
    this.greeterService.addToDPM(p_id, d_id).subscribe(res => {
      if (Math.floor(res.status / 100) === 2) {
        this._alerts.create( 'success', 'Doctor successfully assigned');
        setInterval(() => window.location.reload(), 2000);
      }
    });
  }


  reset() {
    this.patientSet = false;
  }


  ngOnInit() {
  }

}
