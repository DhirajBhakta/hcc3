import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { DoctorComponent } from './doctor.component';


const Doctorroutes: Routes = [
  {
    path: '', component: DoctorComponent,
    children: [
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'workbench', component: WorkbenchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Doctorroutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
