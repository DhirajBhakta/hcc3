import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

enum user_groups {
  NONE,
  PATIENT,
  DOCTOR,
  PHARMA
}


@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:8000/';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private loggedInUser: user_groups = user_groups.NONE;
  public is_multi_profile:boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  isLocallyStored(user_group) {
    const stored_user_group = localStorage.getItem('user-group');
    return stored_user_group !== null &&
           stored_user_group === user_group.toString();
  }

  isLoggedIn() {

    if (this.loggedInUser === user_groups.NONE) {
      return true;
    }
    return [user_groups.DOCTOR, user_groups.PATIENT, user_groups.PHARMA]
              .map(this.isLocallyStored)
              .reduce((x, y) => x || y);
  }

  isPatientLoggedIn() {
    if (this.loggedInUser === user_groups.PATIENT) {
      return true;
    }
    return this.isLocallyStored(user_groups.PATIENT);
  }

  isDoctorLoggedIn() {
    if (this.loggedInUser === user_groups.DOCTOR) {
      return true;
    }
    return this.isLocallyStored(user_groups.DOCTOR);
  }

  isPharmaLoggedIn() {
    if (this.loggedInUser === user_groups.PHARMA) {
      return true;
    }
    return this.isLocallyStored(user_groups.PHARMA)
  }

  login(username: String, password: String) {
    const url = this.BASE_URL + 'token-auth/';
    return this.http.post(url, {username, password}, {headers : this.headers})
                    .do((response)=> this.setSession(response))
  }

  setSession(JWT) {
    localStorage.setItem('JWT', JWT.token);
    this.is_multi_profile = JWT.multi_profile;
    switch (JWT.usergroup.toUpperCase()) {
      case ('PATIENT'): this.loggedInUser = user_groups.PATIENT; break;
      case ('DOCTOR'): this.loggedInUser = user_groups.DOCTOR; break;
      case ('PHARMA'): this.loggedInUser = user_groups.PHARMA; break;
      default: this.loggedInUser = user_groups.NONE; break;
    }
    localStorage.setItem('user-group', this.loggedInUser.toString());
  }

  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user-group');
    this.loggedInUser = user_groups.NONE;
    this.router.navigate(['/login']);
    console.log('logged out', localStorage.getItem('JWT'));
  }

  getRootURL() {
    switch (this.loggedInUser) {
      case(user_groups.PATIENT): return '/patient';
      case(user_groups.DOCTOR): return '/doctor';
      case(user_groups.PHARMA): return '/pharma';
      default: return '/login';
    }
  }
}
