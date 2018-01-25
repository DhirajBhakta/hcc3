import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { HistoryComponent } from './history/history.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { AppointmentsComponent } from './appointments/appointments.component';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { PatientInfoComponent } from './workbench/patient-info/patient-info.component';
import { PRowComponent } from './workbench/p-table/p-row/p-row.component';
import { PTableComponent } from './workbench/p-table/p-table.component';
import { DiagnosisComponent } from './workbench/diagnosis/diagnosis.component';




@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [
    DoctorComponent,
    HistoryComponent,
    WorkbenchComponent,
    AppointmentsComponent,
    PatientInfoComponent,
    PRowComponent,
    PTableComponent,
    DiagnosisComponent
  ],
  exports: [
    DoctorComponent
  ],
})
export class DoctorModule { }
