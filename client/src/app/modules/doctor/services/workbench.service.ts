
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


  getDoctor(person_id) {
    //you get an ARRAY as response , bcos you applied a filter (person__id=person_id)
    //hence get the first element[0].
    return this.http.get(prepareURL(environment.server_base_url, 'doctors') + '?person__id=' + person_id)
      .map((data) => data.json()[0]);
  }

  getQueue(doctor_id) {
    return Observable.interval(5000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'waitingroom') + '?doctor=' + doctor_id))
      .map((data) => data.json());
  }

  submitLabRequest(requestedTests){
    console.log('service',requestedTests);
    return this.http.post(prepareURL(environment.server_base_url,'labreports'),requestedTests);
  }


}
