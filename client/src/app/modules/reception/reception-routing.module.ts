import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DataEntryComponent } from './data-entry/data-entry.component';

const routes: Routes = [
  {
    path: '', component: ReceptionComponent,
    children: [
      { path: '', redirectTo: 'workbench'},
      { path: 'workbench', component: WorkbenchComponent},
      { path: 'timetable', component: TimeTableComponent},
      { path: 'appointments', component: AppointmentsComponent},
      { path: 'data-entry', component: DataEntryComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
