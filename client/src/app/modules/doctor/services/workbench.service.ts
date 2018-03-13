
import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';

@Injectable()
export class WorkbenchService {
  private patientID;

  constructor(private http: JWTHttpClient) { }

  getPatientID(){
    return this.patientID;
  }

  setPatientID(id){
    this.patientID = id;
  }

  getDrugNames() {
    /*For autocomplete*/
    let params = new URLSearchParams();
    params.set('fields', JSON.stringify(['id', 'trade_name']));
    return this.http.get(prepareURL(environment.server_base_url, 'drugs'), { params });
  }

  submitPrescription(prescription){
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(prepareURL(environment.server_base_url, 'prescriptions'), JSON.stringify(prescription),options);
  }

}
