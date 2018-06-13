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

  getSpecialization(doctor_id){
    return this.http.get(prepareURL(environment.server_base_url,'doctors',doctor_id))
              .map((data) => data.json())
              .map(data => data.specialization);
  }
  getQueue(doctor_id) {
    return Observable.interval(1000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'doctors', doctor_id)))
      .map((data) => data.json())
      .map((data) => {
        data.patients_queue.map(patient => patient['isGuest'] = false);
        data.guest_patients_queue.map(patient => patient['isGuest'] = true);
        return data.patients_queue.concat(data.guest_patients_queue).sort(patient => patient.assigned_token);
      });
  }

  setAssignedDoctor(patient, tokenNumber, doctorID) {
    if (typeof patient === 'string')
      return this.http.post(prepareURL(environment.server_base_url, 'guests'),
        {
          "name": patient,
          "assigned_doctor": doctorID,
          "assigned_token": tokenNumber
        });
    return this.http.patch(prepareURL(environment.server_base_url, 'persons', patient.id),
      {
        "assigned_doctor": doctorID,
        "assigned_token": tokenNumber
      });
  }

  resetAssignedDoctor(patient) {
    if (patient.isGuest)
      return this.http.delete(prepareURL(environment.server_base_url, 'guests', patient.id));
    return this.http.patch(prepareURL(environment.server_base_url, 'persons', patient.id),
      {
        "assigned_doctor": null,
        "assigned_token": null
      });
  }

}
