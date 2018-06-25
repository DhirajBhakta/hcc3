import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientProfileComponent} from './patient-profile/patient-profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const Patientroutes: Routes = [
  {
    path: '', component: PatientComponent,
    children: [
      { path: '', redirectTo: 'appointment'},
      { path: 'appointment', component: AppointmentsComponent},
      { path: 'profile', component:  PatientProfileComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(Patientroutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
