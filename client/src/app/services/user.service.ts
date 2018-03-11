import { Injectable } from '@angular/core';
import { JWTHttpClient } from './jwthttp.service';
import {Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {prepareURL} from 'app/utils';


@Injectable()
export class UserService {

  constructor(private http: JWTHttpClient) { }

  getUser(patientUsername: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', patientUsername));
  }

}
