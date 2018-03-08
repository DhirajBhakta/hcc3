import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { AuthService } from './auth.service';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard } from './auth-guards';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers : [
    AuthService, PatientAuthGuard, PharmaAuthGuard, DoctorAuthGuard
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
