import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PharmaModule } from './modules/pharma/pharma.module';
import { PatientAuthGuard, DoctorAuthGuard, PharmaAuthGuard } from './modules/auth/auth-guards';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';



const appRoutes: Routes = [

    {path: 'patient',
     canLoad: [PatientAuthGuard],
     loadChildren: 'app/modules/patient/patient.module#PatientModule'},
    {path: 'doctor',
      canLoad: [DoctorAuthGuard],
     loadChildren: 'app/modules/doctor/doctor.module#DoctorModule'},
    {path: 'pharma',
      canLoad: [PharmaAuthGuard],
      loadChildren: 'app/modules/pharma/pharma.module#PharmaModule'},
    {path: 'login',
      component: LoginComponent}

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
  export class AppRoutingModule {}
