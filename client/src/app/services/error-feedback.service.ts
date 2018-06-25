import { Injectable } from '@angular/core';
import { AlertsService } from '@jaspero/ng-alerts';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/observable/throw';


@Injectable()
export class ErrorFeedbackService {

  constructor(private _alerts: AlertsService) { }

  showFeedback(err, extraMessageDict){
    let status_code = err.status? err.status : (err.message? err.message: "SERVER error");
    let message = status_code + " : " + (extraMessageDict[status_code]? extraMessageDict[status_code]: "");
    this._alerts.create("error",message);
    return Observable.throw(err)
  }

}
