import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabtechRoutingModule } from './labtech-routing.module';
import { LabtechComponent } from './labtech.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { ExaminationComponent } from './examination/examination.component';

@NgModule({
  imports: [
    CommonModule,
    LabtechRoutingModule,
    SharedModule,
    ComponentsModule

  ],
  declarations: [LabtechComponent, ExaminationComponent]
})
export class LabtechModule { }
