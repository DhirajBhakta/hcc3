import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { LabtechComponent } from './labtech.component';
import { LabtechService } from './services/labtech.service';
import { LabTechRoutingModule } from './labtech-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LabTechRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  providers: [
  LabtechService
  ],
  exports:[
    LabtechComponent
  ],

  declarations: [LabtechComponent]
})
export class LabtechModule { }
