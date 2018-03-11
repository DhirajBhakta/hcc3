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
import { DiagnosisComponent } from './workbench/diagnosis/diagnosis.component';

import { WorkbenchService } from './services/workbench.service';


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
    DiagnosisComponent
  ],
  exports: [
    DoctorComponent
  ],
  providers: [
    WorkbenchService
  ],
})
export class DoctorModule { }
