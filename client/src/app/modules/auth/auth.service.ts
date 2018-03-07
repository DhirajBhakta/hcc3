import {Injectable} from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
    const url = this.BASE_URL + 'auth-token';
    return this.http.post(url, {username, password}, {headers : this.headers});
  }
}
