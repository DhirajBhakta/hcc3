import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { JWTHttpClient } from '../../services/jwthttp.service';
import { prepareURL } from 'app/utils';
import { UserService } from '../../services/user.service';

enum user_groups {
  NONE,
  PATIENT,
  DOCTOR,
  PHARMA,
  RECEPTIONIST,
  LABTECH
}


@Injectable()
export class AuthService {

  private BASE_URL = environment.server_auth_url;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private loggedInUser: user_groups = user_groups.NONE;
  public is_multi_profile = false;

  constructor(private http: HttpClient, private router: Router, private jwthttp: JWTHttpClient, private userService: UserService) { }

  /**
  * This function checks if the given user group has been locally stored for further use.
  * The reason this function exists is because the variable 'loggedInUser' sometimes gets lost when state of the app changes.
  * Thus we store the user group in the local storage to determine the type of the user. (And also whether he's logged in).
  * Security issues? Maybe.
  * @param user_group This is the user group to be checked (of type enum user_groups).
  * @returns Returns true or false
  * @memberof AuthService
  */
  isLocallyStored(user_group: user_groups) {
    const stored_user_group = localStorage.getItem('user-group');
    return stored_user_group !== null &&
           stored_user_group === user_group.toString();
  }

  /**
  * This function checks both the local storage and the variable if the user is logged in.
  * @returns Returns true if the user is logged in anyway
  * @memberof AuthService
  */
  isLoggedIn() {

    // Ooops I forgot why I did this
    if (this.loggedInUser === user_groups.NONE) {
      return true;
    }

    // a beauty :')
    return [user_groups.DOCTOR, user_groups.PATIENT, user_groups.PHARMA, user_groups.RECEPTIONIST, user_groups.LABTECH]
              .map(this.isLocallyStored)
              .reduce((x, y) => x || y);
  }

  /**
  * Helper function that checks if the logged in user is a patient
  * @returns Returns true if user is patient
  * @memberof AuthService
  */
  isPatientLoggedIn() {
    if (this.loggedInUser === user_groups.PATIENT) {
      return true;
    }
    return this.isLocallyStored(user_groups.PATIENT);
  }

  /**
  * Helper function that checks if the logged in user is a doctor
  * @returns Returns true if user is doctor
  * @memberof AuthService
  */
  isDoctorLoggedIn() {
    if (this.loggedInUser === user_groups.DOCTOR) {
      return true;
    }
    return this.isLocallyStored(user_groups.DOCTOR);
  }

  /**
  * Helper function that checks if the logged in user is a pharma
  * @returns Returns true if user is pharma
  * @memberof AuthService
  */
  isPharmaLoggedIn() {
    if (this.loggedInUser === user_groups.PHARMA) {
      return true;
    }
    return this.isLocallyStored(user_groups.PHARMA);
  }

  /**
  * Helper function that checks if the logged in user is a receptionist
  * @returns Returns true if user is receptionist
  * @memberof AuthService
  */
  isReceptionLoggedIn() {
    if (this.loggedInUser === user_groups.RECEPTIONIST) {
      return true;
    }
    return this.isLocallyStored(user_groups.RECEPTIONIST);
  }

  /**
  * Helper function that checks if the logged in user is a labtechnician
  * @returns Returns true if user is labtech
  * @memberof AuthService
  */
  isLabTechLoggedIn() {
    if (this.loggedInUser === user_groups.LABTECH) {
      console.log('yeah, labtech');
      return true;
    }
    return this.isLocallyStored(user_groups.LABTECH);
  }

  /**
   * This function logs in the given username and password parameters by using a post request to the auth server.
   * @param {String} username
   * @param {String} password
   * @returns The response from the JWT server which is a User object with a Person object inside of it.
   * @memberof AuthService
   */
  login(username: String, password: String) {
    const url = this.BASE_URL + '/token-auth/';
    return this.http.post(url, {username, password}, {headers : this.headers})
                    .do((response) => this.setSession(response));
  }

  /**
  * This function takes the JWT token from authentication and  sets the local storage JWT and user_group.
  * @param JWT The JWT token returned by the authentication server
  * @returns None.
  * @memberof AuthService
  */
  setSession(JWT) {
    console.log(JWT)
    localStorage.setItem('JWT', JWT.token)
    localStorage.setItem('logout-info', '' + JWT.logout_info);
    this.is_multi_profile = JWT.multi_profile;
    switch (JWT.usergroup.toUpperCase()) {
      case ('PATIENT'): this.loggedInUser = user_groups.PATIENT; break;
      case ('DOCTOR'): this.loggedInUser = user_groups.DOCTOR; break;
      case ('PHARMA'): this.loggedInUser = user_groups.PHARMA; break;
      case ('RECEPTIONIST'): this.loggedInUser = user_groups.RECEPTIONIST; break;
      case ('LABTECH'):this.loggedInUser = user_groups.LABTECH;break;
      default: this.loggedInUser = user_groups.NONE; break;
    }
    localStorage.setItem('user-group', this.loggedInUser.toString());
    this.userService.getCurrentPerson();
    this.userService.getCurrentUser();
  }
  /**
   * This function logs out the current user and removes traces from local strage.
   * @returns None.
   * @memberof AuthService
   */
  logout() {
    const logout_token = localStorage.getItem('logout-info');
    this.jwthttp.delete(prepareURL(environment.server_base_url, 'loggedusers',  logout_token))
                .subscribe(response => {
                  localStorage.removeItem('JWT');
                  localStorage.removeItem('user-group');
                  localStorage.removeItem('logout-info');
                  this.loggedInUser = user_groups.NONE;
                  this.router.navigate(['/login']);
                  console.log('logged out', localStorage.getItem('JWT'));
                  this.userService.setCurrentPerson(null);
                  this.userService.setCurrentUser(null);
                });
  }



  /**
   * Returns the root URL for the current logged in user.
   * @returns root URL for the current logged in user type.
   * @memberof AuthService
   */
  getRootURL() {
    console.log('here',this.loggedInUser);
    switch (this.loggedInUser) {
      case(user_groups.PATIENT): return '/patient';
      case(user_groups.DOCTOR): return '/doctor';
      case(user_groups.PHARMA): return '/pharma';
      case(user_groups.RECEPTIONIST): return '/reception';
      case(user_groups.LABTECH): return '/labtech';
      default: return '/login';
    }
  }
}
