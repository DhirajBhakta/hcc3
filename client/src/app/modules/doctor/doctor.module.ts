import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { WorkbenchComponent } from './workbench/workbench.component';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { PatientInfoComponent } from './workbench/patient-info/patient-info.component';

import { WorkbenchService } from './services/workbench.service';
import { HistoryService } from './services/history.service';
import { AgGridModule } from 'ag-grid-angular';
import { LabRequestComponent } from './workbench/lab-request/lab-request.component';
import { HistoryCardComponent } from './history-card/history-card.component';


@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    ComponentsModule,
    AgGridModule.withComponents([ ])
  ],
  declarations: [
    DoctorComponent,
    WorkbenchComponent,
    PatientInfoComponent,
    LabRequestComponent,
    HistoryCardComponent
  ],
  exports: [
    DoctorComponent
  ],
  providers: [
    WorkbenchService,
    HistoryService
  ],
})
export class DoctorModule { }
