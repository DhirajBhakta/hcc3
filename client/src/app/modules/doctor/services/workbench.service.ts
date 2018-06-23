
import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';

@Injectable()
export class WorkbenchService {

  constructor(private http: JWTHttpClient) { }


  getDoctor() {
    return this.http.get(prepareURL(environment.server_base_url, 'doctors','me'))
      .map((data) => data.json());
  }

  getQueue(doctor_id) {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'waitingroom') + '?doctor=' + doctor_id))
      .map((data) => data.json());
  }
  popQueue(waiting_item_id){
    return this.http.delete(prepareURL(environment.server_base_url,'waitingroom',waiting_item_id))
  }

  submitLabRequest(requestedTests){
    return this.http.post(prepareURL(environment.server_base_url,'labreports'),requestedTests);
  }

  submitDiagnosis(doctor_id, patient_id, indication){
    return this.http.post(prepareURL(environment.server_base_url,'patienthistory'),{
      "doctor_id":doctor_id,
      "patient_id":patient_id,
      "indication":indication
    });
  }

  getLabReport(labreport_id){
    return this.http.get(prepareURL(environment.server_base_url,'labreports',labreport_id))
                    .map((data)=> data.json());
  }

  getLabReports(patient_id){
    return this.http.get(prepareURL(environment.server_base_url,'labreports')+'?done='+true+'&patient_id='+patient_id)
                    .map((data)=> data.json());
  }

  getPatientHistory(patient_id){
    return this.http.get(prepareURL(environment.server_base_url,'patienthistory')+'?patient_id='+patient_id)
                  .map((data)=> data.json());
  }


}
