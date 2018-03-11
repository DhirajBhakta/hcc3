import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { JWTHttpClient } from './jwthttp.service';

import { AuthService } from './auth.service';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard } from './auth-guards';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule
  ],
  providers : [
    AuthService,
    PatientAuthGuard,
    PharmaAuthGuard,
    DoctorAuthGuard,
    {
      provide: JWTHttpClient,
      useFactory: (backend: XHRBackend, options: RequestOptions, router: Router) => {
        return new JWTHttpClient(backend, options, router);
      },
      deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
