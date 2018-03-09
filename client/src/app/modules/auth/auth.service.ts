import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/do';

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

  constructor(private http: HttpClient) { }

  isPatientLoggedIn() {
    return (this.loggedInUser == user_groups.PATIENT);
  }

  isDoctorLoggedIn() {
    return (this.loggedInUser == user_groups.DOCTOR);
  }

  isPharmaLoggedIn() {
    return (this.loggedInUser == user_groups.PHARMA);
  }

  login(username: String, password: String) {
    const url = this.BASE_URL + 'token-auth/';
    return this.http.post(url, {username, password}, {headers : this.headers});
  }

  setSession(JWT) {
    localStorage.setItem('JWT', JWT.token);
    switch (JWT.usergroup.toUpperCase()) {
      case ('PATIENT'): this.loggedInUser = user_groups.PATIENT; break;
      case ('DOCTOR'): this.loggedInUser = user_groups.DOCTOR; break;
      case ('PHARMA'): this.loggedInUser = user_groups.PHARMA; break;
      default: this.loggedInUser = user_groups.NONE; break;
    }
    console.log("inside setSession:", JWT);
  }

  logout(){
    localStorage.removeItem('JWT');
    this.loggedInUser = user_groups.NONE;
  }

  getRootURL(){
    switch(this.loggedInUser){
      case(user_groups.PATIENT): return '/patient';
      case(user_groups.DOCTOR): return '/doctor';
      case(user_groups.PHARMA): return '/pharma';
      default: return '/login';
    }
  }
}
