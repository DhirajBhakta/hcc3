import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { GreeterComponent } from './greeter/greeter.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { QueueService } from './services/queue.service';
import { StatusCardComponent } from './status-card/status-card.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AppointmentsService } from './services/appointments.service';
import { SpecFormComponent } from './time-table/spec-form/spec-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ReceptionComponent, GreeterComponent, StatusCardComponent, TimeTableComponent, SpecFormComponent],
  exports: [
    ReceptionComponent
  ],
  providers : [
    QueueService,
    AppointmentsService
  ]
})
export class ReceptionModule { }
