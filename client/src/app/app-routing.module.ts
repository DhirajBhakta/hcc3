import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './modules/patient/patient.component';
import { DoctorComponent } from './modules/doctor/doctor.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [

    { path: 'patient', component: PatientComponent },
    { path: 'doctor', component: DoctorComponent},
    { path: '', component: AppComponent},

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

