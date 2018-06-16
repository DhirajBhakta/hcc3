import { Injectable } from '@angular/core';
import { JWTHttpClient } from '../../../services/jwthttp.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { replaceKeys, prepareURL, addParams } from 'app/utils';
import { environment } from 'environments/environment';
import { AppointmentSpec } from '../models/spec.model';
import { Appointment } from '../models/appointment.model';


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


  // CRUD Endpoints for Appointment Spec
  //
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

  // CRUD Endpoints for Appointments
  //
  createAppointments(apps: Appointment[]) {
    return this.http.post(prepareURL(environment.server_base_url, 'appointments'), apps, this.options)
                    .map(data => data.json());
  }
  updateAppointment(app: Appointment) {
    return this.http.put(prepareURL(environment.server_base_url, 'appointments', app.id), app)
                    .map(data => data.json());
  }
  deleteAppointment(app_id) {
    return this.http.delete(prepareURL(environment.server_base_url, 'appointments', app_id))
                    .map(data => data.json());
  }
  getAppointments() {
    return this.http.get(prepareURL(environment.server_base_url, 'appointments'))
                    .map(data => data.json());
  }
  getAppointmentWithParams(params: Object) {
    return this.http.get(prepareURL(environment.server_base_url, 'appointments') + addParams(params))
                    .map(data => data.json());

  }

  // CRUD Endpoints for Slots
  //
  getSlotsWithParams(params: Object) {
    return this.http.get(prepareURL(environment.server_base_url, 'slots') + addParams(params))
                    .map(data => data.json());
  }
  updateSlot(slot) {
    return this.http.put(prepareURL(environment.server_base_url, 'slots', slot.id), slot)
                    .map(data => data.json());
  }
  createSlot(slot) {
    return this.http.post(prepareURL(environment.server_base_url, 'slots'), slot)
                    .map(data => data.json());
  }
  deleteSlot(slot_id) {
    return this.http.delete(prepareURL(environment.server_base_url, 'slots', slot_id))
                    .map(data => data.json());
  }
}
