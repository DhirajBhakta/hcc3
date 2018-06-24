import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { WorkbenchComponent } from './workbench/workbench.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { QueueService } from './services/queue.service';
import { StatusCardComponent } from './status-card/status-card.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AppointmentsService } from './services/appointments.service';
import { SpecFormComponent } from './time-table/spec-form/spec-form.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { GenerateComponent } from './appointments/generate/generate.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { ViewAppointmentsComponent } from './appointments/view-appointments/view-appointments.component';
import { AppointmentItemComponent } from './appointments/appointment-item/appointment-item.component';
import { CreateSlotComponent } from './appointments/appointment-item/create-slot/create-slot.component';
import { SlotItemComponent } from './appointments/appointment-item/slot-item/slot-item.component';
import { ConfirmAppointmentsComponent } from './appointments/confirm-appointments/confirm-appointments.component';

@NgModule({
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ReceptionComponent,
                 WorkbenchComponent,
                 StatusCardComponent,
                 TimeTableComponent,
                 SpecFormComponent,
                 AppointmentsComponent,
                 GenerateComponent,
                 CreateAppointmentComponent,
                 ViewAppointmentsComponent,
                 AppointmentItemComponent,
                 CreateSlotComponent,
                 SlotItemComponent,
                 ConfirmAppointmentsComponent,
  ],
  exports: [
    ReceptionComponent
  ],
  providers : [
    QueueService,
    AppointmentsService
  ]
})
export class ReceptionModule { }
