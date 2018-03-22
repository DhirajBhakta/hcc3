
import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';

@Injectable()
export class PatientService {

  constructor(private http: JWTHttpClient) { }

  getPrescriptions() {
    return this.http.get(prepareURL(environment.server_base_url, 'prescriptions'))
                    .map((response)=> response.json());
  }



}
