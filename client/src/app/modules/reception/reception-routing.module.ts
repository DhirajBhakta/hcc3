import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { GreeterComponent } from './greeter/greeter.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {
    path: '', component: ReceptionComponent,
    children: [
      { path: '', redirectTo: 'greeter'},
      { path: 'greeter', component: GreeterComponent},
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
