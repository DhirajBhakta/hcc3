import { NgModule } from '@angular/core';
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
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new JWTHttpClient(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
