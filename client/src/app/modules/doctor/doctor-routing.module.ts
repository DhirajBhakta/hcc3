import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkbenchComponent } from './workbench/workbench.component';
import { LabreportComponent } from './labreport/labreport.component';
import { DoctorComponent } from './doctor.component';

import {DoctorAuthGuard} from '../auth/auth-guards';


const Doctorroutes: Routes = [
  {
    path: '', component: DoctorComponent,
    children: [
      {path : '', redirectTo: 'workbench', },
      { path: 'workbench', component: WorkbenchComponent },
      { path: 'labreport/:id', component: LabreportComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(Doctorroutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
