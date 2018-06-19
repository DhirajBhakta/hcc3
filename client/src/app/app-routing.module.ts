import { NgModule } from '@angular/core';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard, ReceptionAuthGuard, LabTechAuthGuard } from './modules/auth/auth-guards';
import { RouterModule, Routes, } from '@angular/router';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PharmaModule } from './modules/pharma/pharma.module';
import { ReceptionModule } from './modules/reception/reception.module';
import { LabtechModule } from './modules/labtech/labtech.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';


const appRoutes: Routes = [
  {
    path: 'patient',
    canLoad: [PatientAuthGuard],
    loadChildren: 'app/modules/patient/patient.module#PatientModule'
  },
  {
    path: 'doctor',
    canLoad: [DoctorAuthGuard],
    loadChildren: 'app/modules/doctor/doctor.module#DoctorModule'
  },
  {
    path: 'pharma',
    canLoad: [PharmaAuthGuard],
    loadChildren: 'app/modules/pharma/pharma.module#PharmaModule'
  },
  {
    path: 'reception',
    canLoad: [ReceptionAuthGuard],
    loadChildren: 'app/modules/reception/reception.module#ReceptionModule'
  },
  {
    path: 'labtech',
    canLoad: [LabTechAuthGuard],
    loadChildren: 'app/modules/labtech/labtech.module#LabtechModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'http-error/:error_code',
    component: HttpErrorComponent
  },
  {
    path: '**',
    component: HttpErrorComponent
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
