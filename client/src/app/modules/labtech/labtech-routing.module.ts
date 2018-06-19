import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabtechComponent } from './labtech.component';
import { ExaminationComponent } from './examination/examination.component';

const routes: Routes = [
  {
    path: '', component: LabtechComponent,
    children: [
      { path: '', redirectTo: 'examination'},
      { path: 'examination', component: ExaminationComponent},
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabtechRoutingModule { }
