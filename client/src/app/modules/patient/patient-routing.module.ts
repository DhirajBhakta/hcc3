import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments/appointments.component';
import { HistoryComponent } from './history/history.component';
import { PatientComponent } from './patient.component';

const Patientroutes: Routes = [
  {
    path: '', component: PatientComponent,
    children: [
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(Patientroutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
