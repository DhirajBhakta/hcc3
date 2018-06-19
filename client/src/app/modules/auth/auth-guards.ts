import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';

@Injectable()
export class PatientAuthGuard implements CanLoad {
  constructor(private authService: AuthService , private router: Router) { }

  canLoad() {
    console.log('Trying to authorize Patient');
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
  constructor(private authService: AuthService, private router: Router) { }

  canLoad() {
    console.log('Trying to authorize Doctor');
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
  constructor(private authService: AuthService, private router: Router) { }

  canLoad() {
    console.log('Trying to authorize Pharma');
    if (this.authService.isPharmaLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable()
export class ReceptionAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad() {
    console.log('Trying to authorize Pharma');
    if (this.authService.isReceptionLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable()
export class LabtechAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad() {
    console.log('Trying to authorize Pharma');
    if (this.authService.isLabtechLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


@Injectable()
export class LoggedInAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate() {
    console.log('Trying to authorize logged in');
    if (this.authService.isDoctorLoggedIn()) {
      this.router.navigate(['/doctor']);
      return true;
    }
    else if (this.authService.isPatientLoggedIn()) {
      this.router.navigate(['/patient']);
      return true;
    }
    else if (this.authService.isPharmaLoggedIn()) {
      this.router.navigate(['/pharma']);
      return true;
    }
    else if (this.authService.isReceptionLoggedIn()) {
      this.router.navigate(['/reception']);
      return true;
    }
    else if (this.authService.isLabtechLoggedIn()) {
      this.router.navigate(['/labtech']);
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
