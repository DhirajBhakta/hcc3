
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
  private patientID;
  private dpmID; // This is to remove the entry from DPM table after diagnosis step is done

  constructor(private http: JWTHttpClient) { }
  getPatientID(){
    return this.patientID;
  }

  setPatientID(id){
    this.patientID = id;
  }

  getDpmID() {
    return this.dpmID;
  }

  setDpmID(dpmID) {
    this.dpmID = dpmID;
  }

  getDrugNames() {
    /*For autocomplete*/
    const params = new URLSearchParams();
    params.set('fields', JSON.stringify(['id', 'trade_name']));
    return this.http.get(prepareURL(environment.server_base_url, 'drugs'), { params });
  }

  submitPrescription(prescription){
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(prepareURL(environment.server_base_url, 'prescriptions'), prescription, options);
  }

  getQueue(doctor_id){
    return Observable.interval(5000)
    .switchMap(()=> this.http.get(prepareURL(environment.server_base_url,'doctors',doctor_id)))
    .map((data)=>data.json().patients_queue);
  }


  updateDPM() {
    return this.http.delete(prepareURL(environment.server_base_url, 'doctorpatientmap', '' + this.dpmID));
  }

}
