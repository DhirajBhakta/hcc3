import { Injectable } from '@angular/core';
import { JWTHttpClient } from '../../../services/jwthttp.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';
import { AppointmentSpec } from '../time-table/spec-form/spec.model';


import { RequestOptions, Headers } from '@angular/http';
@Injectable()
export class AppointmentsService {

  private headers;
  private options;
  constructor(private http: JWTHttpClient) {

  this.headers = new Headers();
  this.headers.append('content-type', 'application/json');
  this.options = new RequestOptions({ headers: this.headers });

  }

  getDoctors() {
    return this.http.get(prepareURL(environment.server_base_url, 'doctors'))
               .do(data => console.log(data))
               .map(data => data.json());
  }
  getSpecForDoctor(doctor_id) {
    return this.http.get(prepareURL(environment.server_base_url, 'appointment_specs') + '?doctor=' + doctor_id)
            .do(data => console.log(data))
            .map(data => data.json());
  }
  createSpec(spec: AppointmentSpec) {
    return this.http.post(prepareURL(environment.server_base_url, 'appointment_specs'), spec, this.options)
           .map(data => data.json());
  }
  updateSpec(spec: AppointmentSpec) {
    return this.http.put(prepareURL(environment.server_base_url, 'appointment_specs', spec.id), spec)
           .map(data => data.json());
  }
  deleteSpec(spec_id) {
    return this.http.delete(prepareURL(environment.server_base_url, 'appointment_specs', spec_id))
           .map(data => data.json());
  }

}
