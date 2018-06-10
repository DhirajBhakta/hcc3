import { Injectable } from '@angular/core';
import { JWTHttpClient } from './jwthttp.service';
import {Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {prepareURL} from 'app/utils';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  private loggedInUser;
  private currentPerson;

  constructor(private http: JWTHttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .do((response) => {
                      this.loggedInUser = response.json();
                      this.currentPerson = this.loggedInUser.person;
                    });
  }

  setCurrentPerson(person){
    this.currentPerson = person;
  }

}
