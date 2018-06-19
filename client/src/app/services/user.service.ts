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
                    })
                    .catch(err => Observable.throw(new Error(err.status)));
  }

  getUser2(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .catch(err => Observable.throw(new Error(err.status)));
  }

  setCurrentPerson(person) {
    this.currentPerson = person;
  }

  getAllLoggedInUsers() {
      return this.http.get(prepareURL(environment.server_base_url,'loggedusers'))
                      .map(response => response.json());
  }

  getPerson(person_id) {
    return this.http.get(prepareURL(environment.server_base_url, 'persons', person_id))
                    .map(response => response.json());
  }
  _getFamily(username) {
    return this.getUser2(username).map((response) => {
      const patron = response.json().person;
      const family = patron.dependants;
      family.unshift(patron);
      return family;
    });
  }

}
