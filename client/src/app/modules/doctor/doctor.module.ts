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
import { PatientHistoryComponent } from './workbench/patient-history/patient-history.component';
import { LabreportComponent } from './labreport/labreport.component';


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
    PatientHistoryComponent,
    LabreportComponent
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
