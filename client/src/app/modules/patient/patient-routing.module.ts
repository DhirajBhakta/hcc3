import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments/appointments.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
