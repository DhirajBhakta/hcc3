import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {path: 'patient',
     loadChildren: 'app/modules/patient/patient.module#PatientModule'},
    {path: 'doctor',
      loadChildren: 'app/modules/doctor/doctor.module#DoctorModule'},

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
