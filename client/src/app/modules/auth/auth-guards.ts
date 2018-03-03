import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';

@Injectable()
export class PatientAuthGuard implements CanLoad {
  constructor(private authService: AuthService) { };

  canLoad() {
    console.log("Trying to authorize Patient");
    if (this.authService.isPatientLoggedIn()) {
      return true;
    } else {
      window.alert("You're not a patient!, you dont have permissions to view this");
      return false;
    }
  }
}




@Injectable()
export class DoctorAuthGuard implements CanLoad {
  constructor(private authService: AuthService) { };

  canLoad() {
    console.log("Trying to authorize Doctor");
    if (this.authService.isDoctorLoggedIn()) {
      return true;
    } else {
      window.alert("You're not a doctor!, you dont have permissions to view this");
      return false;
    }
  }
}





@Injectable()
export class PharmaAuthGuard implements CanLoad {
  constructor(private authService: AuthService) { };

  canLoad() {
    console.log("Trying to authorize Pharma");
    if (this.authService.isPharmaLoggedIn()) {
      return true;
    } else {
      window.alert("You're not pharma! you dont have permissions to view this");
      return false;
    }
  }
}
