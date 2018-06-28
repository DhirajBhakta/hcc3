import { Injectable } from '@angular/core';
import { JWTHttpClient } from './jwthttp.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { prepareURL } from 'app/utils';
import { ErrorFeedbackService } from 'app/services/error-feedback.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/toArray';



@Injectable()
export class UserService {

  private currentPerson$ = null;
  private currentUser$ = null;

  constructor(private http: JWTHttpClient, private feedbackService:ErrorFeedbackService) { }

  getUser(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .map((data) => data.json())
                    .catch(err => Observable.throw(new Error(err.status)));
  }

  getUser2(username: string): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'users', username))
                    .catch(err => Observable.throw(new Error(err.status)));
  }



  getFamily(username: string) {
    const getPatron = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons', personID))
                                    .map((data) => data.json());
    const getDependants = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons') + '?patron=' + personID)
                                        .map((data) => data.json()).concatAll();
    const httpRequests = [];
    return this.getUser(username)
      .flatMap((user) => {
        httpRequests.push(getPatron(user.person.id));
        if (user.person.patient_type === 'EMPLOYEE') {
            httpRequests.push(getDependants(user.person.id));
        }
        return Observable.concat(...httpRequests).toArray();
      })
      .catch((err) => this.feedbackService.showFeedback(err,{"404":"Invalid username"}));
  }

  // getFamily(username: string) {
  //   const getPatron = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons', personID))
  //                                    .map(data => data.json());
  //   const getDependants = (personID) => this.http.get(prepareURL(environment.server_base_url, 'persons') + '?patron=' + personID)
  //                                       .map(data => data.json());
  //   return this.getUser(username)
  //     .flatMap((user) => {
  //       return this.getPerson(user.person.id);
  //     })
  //     .flatMap((person) => {
  //       if (person.patient_type !=== "EMPLOYEE") {
  //         return Observable.of(person);
  //       }
  //       else {
  //         return getDependants(person.id)
  //           .flatMap(dependants => {
  //             dependants.unshift(person);
  //             return Observable.of(dependants);
  //           })
  //       }
  //     });
  // }

  /**ambiguous, deprecated due to dependants profile being eliminated*/
  setCurrentPerson(person) {
    this.currentPerson$ = person;
  }

  setCurrentUser(user) {
    this.currentUser$ = user;
  }

  getCurrentUser() {
    if (!this.currentUser$) {
      this.currentUser$ = this.http.get(prepareURL(environment.server_base_url, 'users', 'me'))
                            .map(data => data.json());
    }
    return this.currentUser$;
  }
  getCurrentPerson() {
    console.log(this.currentPerson$);
    if (!this.currentPerson$)
      this.currentPerson$ = this.http.get(prepareURL(environment.server_base_url,"persons","me"))
                                  .map((data) => data.json());
    return this.currentPerson$;
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
  createDependant(dependant) {
    return this.http.post(prepareURL(environment.server_base_url, 'persons'), dependant)
                    .map(data => data.json());
  }

}
