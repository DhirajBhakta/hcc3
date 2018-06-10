import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { GreeterComponent } from './greeter/greeter.component';

const routes: Routes = [
  {
    path: '', component: ReceptionComponent,
    children: [
      { path: '', redirectTo: 'greeter'},
      { path: 'greeter', component: GreeterComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
