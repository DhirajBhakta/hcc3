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
  public is_multi_profile:boolean = false;

  constructor(private http: HttpClient) { }

  isPatientLoggedIn() {
    return (this.loggedInUser == user_groups.PATIENT);
  }

  isDoctorLoggedIn() {
    // return (this.loggedInUser == user_groups.DOCTOR);
    return true;
  }

  isPharmaLoggedIn() {
  //  return (this.loggedInUser == user_groups.PHARMA);
  return true;
  }

  login(username: String, password: String) {
    const url = this.BASE_URL + 'token-auth/';
    return this.http.post(url, {username, password}, {headers : this.headers})
                    .do((response)=> this.setSession(response));
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
