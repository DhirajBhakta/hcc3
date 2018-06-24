import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientProfileComponent} from './patient-profile/patient-profile.component';
import { BookAppointmentComponent } from '../../components/book-appointment/book-appointment.component';

const Patientroutes: Routes = [
  {
    path: '', component: PatientComponent,
    children: [
      { path: 'appointment', component: BookAppointmentComponent},
      { path: 'profile', component:  PatientProfileComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(Patientroutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
