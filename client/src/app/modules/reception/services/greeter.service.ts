import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';


@Injectable()
export class GreeterService {

  constructor(private http: JWTHttpClient) { }

  /**
   * This function returns a list of logged in users.
   * @returns Response from the GET request on /loggedusers
   * @memberof GreeterService
   */
  getLoggedUsers() {
    return this.http.get(prepareURL(environment.server_base_url, 'loggedusers'))
                    .map(response => response.json())
                    .do(response => console.log(response));
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
