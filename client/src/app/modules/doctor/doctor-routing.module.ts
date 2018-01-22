import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { WorkbenchComponent } from './workbench/workbench.component';


const routes: Routes = [
  {path: 'doctor/appointments', component: AppointmentsComponent},
  {path: 'doctor/history', component: HistoryComponent},
  {path: 'doctor/workbench', component: WorkbenchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
