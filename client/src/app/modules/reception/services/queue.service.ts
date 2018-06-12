import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';


@Injectable()
export class QueueService {

  constructor(private http: JWTHttpClient) { }

  getQueue(doctor_id){
    return Observable.interval(1000)
    .switchMap(()=> this.http.get(prepareURL(environment.server_base_url,'doctors',doctor_id)))
    .map((data)=>data.json());
  }

  setAssignedDoctor(personID, doctorID){
    return this.http.patch(prepareURL(environment.server_base_url,'persons',personID),{"assigned_doctor":doctorID});
  }

  /**
   * This function adds an entry to the DoctorPatientMap in the backend. Creates a relation b/w doctor and patient.
   *
   * @param {*} p_id Patient ID
   * @param {*} d_id Doctor ID
   * @returns Response from the POST request to /doctorpatientmap endpoint
   * @memberof GreeterService
   */
  addToDPM(p_id, d_id) {
    const payload = {patient_id : p_id, doctor_id : d_id};
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(prepareURL(environment.server_base_url, 'doctorpatientmap'), payload, options);
  }
}
