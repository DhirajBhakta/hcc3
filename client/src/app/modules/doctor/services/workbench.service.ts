
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
  
  getQueue(doctor_id) {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'doctors', doctor_id)))
      .map((data) => data.json())
      .map((data) => {
        data.guest_patients_queue.map(patient => patient['patient_type'] = 'guest');
        return data.patients_queue.concat(data.guest_patients_queue).sort(patient => patient.assigned_token);
      });
  }


}
