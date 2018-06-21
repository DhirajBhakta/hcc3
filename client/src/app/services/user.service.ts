import { Injectable } from '@angular/core';
import { JWTHttpClient } from './jwthttp.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { prepareURL } from 'app/utils';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/concatAll';


@Injectable()
export class UserService {

  private currentPerson: any = null;

  constructor(private http: JWTHttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .map((data) => data.json());
                    .catch(err => Observable.throw(new Error(err.status)));
  }

  getUser2(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .catch(err => Observable.throw(new Error(err.status)));
  }



  getFamily(username: string) {
    let getPatron = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons', personID)).map((data) => data.json());
    let getDependants = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons') + '?patron=' + personID).map((data) => data.json()).concatAll();
    let httpRequests = [];
    return this.getUser(username)
      .flatMap((user) => {
        httpRequests.push(getPatron(user.person.id));
        if (user.person.patient_type == "EMPLOYEE")
            httpRequests.push(getDependants(user.person.id));
        return Observable.forkJoin(httpRequests);
      });
  }

  setCurrentPerson(person) {
    this.currentPerson = person;
  }

  getCurrentPerson() {
    return this.currentPerson;
  }

  getAllLoggedInUsers() {
    return this.http.get(prepareURL(environment.server_base_url, 'loggedusers'))
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
