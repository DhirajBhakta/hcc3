import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { GreeterComponent } from './greeter/greeter.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { GreeterService } from './services/greeter.service';

@NgModule({
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ReceptionComponent, GreeterComponent],
  exports: [
    ReceptionComponent
  ],
  providers : [
    GreeterService
  ]
})
export class ReceptionModule { }
