import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {
    path: '', component: ReceptionComponent,
    children: [
      { path: '', redirectTo: 'workbench'},
      { path: 'workbench', component: WorkbenchComponent},
      { path: 'timetable', component: TimeTableComponent},
      { path: 'appointments', component: AppointmentsComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
