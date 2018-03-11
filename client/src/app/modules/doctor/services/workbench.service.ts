
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JWTHttpClient } from 'app/modules/auth/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';

@Injectable()
export class WorkbenchService {
  constructor(private http: JWTHttpClient) { }

  public getPatient(patientUsername: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'persons', patientUsername));
                    // .do((response)=> this.currentPatient = response.json());
  }


}
