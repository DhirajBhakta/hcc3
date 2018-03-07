import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { AuthService } from './auth.service';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard } from './auth-guards';
import { LoginComponent } from './login/login.component';

import { CookieModule } from 'ngx-cookie';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CookieModule.forRoot(),
  ],
  providers : [
    AuthService, PatientAuthGuard, PharmaAuthGuard, DoctorAuthGuard
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
