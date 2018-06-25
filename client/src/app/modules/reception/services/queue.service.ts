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


  getDoctor(person_id) {
    //you get an ARRAY as response , bcos you applied a filter (person__id=person_id)
    //hence get the first element[0].
    return this.http.get(prepareURL(environment.server_base_url, 'doctors') + '?person__id=' + person_id)
      .map((data) => data.json()[0]);
  }

  getQueue(doctor_id) {
    return Observable.interval(2000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'waitingroom') + '?doctor=' + doctor_id))
      .map((data) => data.json())
      .map((data) => data.sort((item)=> item.token));
  }

  createGuest(name: string) {
    return this.http.post(prepareURL(environment.server_base_url, 'guests'), { "name": name })
      .map((response) => response.json());
  }

  enqueue(patient, token, doctorID) {
    if (typeof patient === 'string'){
      return this.createGuest(patient)
            .flatMap((newguest) =>
                this.http.post(prepareURL(environment.server_base_url,'waitingroom'),
                {
                  "guest_id":newguest.id,
                  "patient_id":null,
                  "doctor":doctorID,
                  "token":token,
                }));
              }
    return this.http.post(prepareURL(environment.server_base_url, 'waitingroom'),
      {
        "guest_id":null,
        "patient_id": patient.id,
        "doctor":doctorID,
        "token": token,
      });
  }

  dequeue(waiting_item) {
    return this.http.delete(prepareURL(environment.server_base_url, 'waitingroom', waiting_item.id));
  }

}
