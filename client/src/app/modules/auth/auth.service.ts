import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  private BASE_URL= 'http://localhost:8000/';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  isPatientLoggedIn() {
    return true;
  }

  isDoctorLoggedIn() {
    return false;
  }

  isPharmaLoggedIn() {
    return false;
  }

  login(username: String, password: String) {
    const url = this.BASE_URL + 'token-auth';
    return this.http.post(url, {username, password}, {headers : this.headers});
  }

  setSession(JWT) {
        localStorage.setItem('JWT', JWT.token);
        console.log("inside setSession:",JWT);
      }
}
