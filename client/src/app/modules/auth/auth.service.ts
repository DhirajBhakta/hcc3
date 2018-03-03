import {Injectable} from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  private BASE_URL= 'http://localhost:4200/auth';
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

  login(user: User) {
    const url = this.BASE_URL + '_login';
    return this.http.post(url, user, {headers : this.headers});
  }
}
