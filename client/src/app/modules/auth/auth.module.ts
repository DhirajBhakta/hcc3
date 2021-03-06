import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { AuthService } from './auth.service';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard, ReceptionAuthGuard, LabTechAuthGuard } from './auth-guards';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers : [
    AuthService,
    PatientAuthGuard,
    PharmaAuthGuard,
    DoctorAuthGuard,
    ReceptionAuthGuard,
    LabTechAuthGuard
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
