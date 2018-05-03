import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';

@Injectable()
export class PatientAuthGuard implements CanLoad {
  constructor(private authService: AuthService , private router: Router) { };

  canLoad() {
    console.log("Trying to authorize Patient");
    if (this.authService.isPatientLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}




@Injectable()
export class DoctorAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { };

  canLoad() {
    console.log("Trying to authorize Doctor");
    if (this.authService.isDoctorLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}





@Injectable()
export class PharmaAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { };

  canLoad() {
    console.log("Trying to authorize Pharma");
    if (this.authService.isPharmaLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
