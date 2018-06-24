import { Component, OnInit } from '@angular/core';

import { LabtechService } from './services/labtech.service';
import { AlertsService } from '@jaspero/ng-alerts';
import * as moment from 'moment';



@Component({
  selector: 'app-labtech',
  templateUrl: './labtech.component.html',
  styleUrls: ['./labtech.component.css']
})
export class LabtechComponent implements OnInit {
  navLinks: any[] = [];

  requests: any[] = [];
  currentRequest: any = null;

  constructor(private labtechService: LabtechService, private _alerts: AlertsService) { }

  ngOnInit() {
    this.labtechService.getNotifications().subscribe((labrequests) => this.requests = labrequests);
  }

  setCurrentRequest(request) {
    this.currentRequest = request;
  }

  reset(){
    this.currentRequest = null;
  }

  onSubmit(formvalues) {
    let required = [];
    let currentRequest = this.currentRequest;
    for (let property in currentRequest)
      if (currentRequest.hasOwnProperty(property))
        if (currentRequest[property] == "REQUIRED")
          required.push(property);
    for (let property of required)
      if (formvalues[property] == "" || formvalues[property] == null)
        return this._alerts.create('error', 'Please fill the required field - ' + property);

    formvalues["done"]=true;
    formvalues["date"]=moment.utc(new Date()).format();
    this.labtechService.submitLabReport(currentRequest.id, formvalues).subscribe((response)=> this._alerts.create("success", "Report submitted"));
  }
}
