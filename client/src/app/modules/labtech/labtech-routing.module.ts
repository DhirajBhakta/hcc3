import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabtechComponent } from './labtech.component';

const routes: Routes = [
  {
    path: '',
    component: LabtechComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabTechRoutingModule { }
