import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule }  from "ag-grid-angular/main";

import { PharmaRoutingModule } from './pharma-routing.module';
import { PharmaComponent } from './pharma.component';
import { HistoryComponent } from './history/history.component';
import { StockupdateComponent } from './stockupdate/stockupdate.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { AddNewDrugComponent } from './inventory/add-new-drug/add-new-drug.component';


@NgModule({
  imports: [
    CommonModule,
    PharmaRoutingModule,
    SharedModule,
    ComponentsModule,
    AgGridModule.withComponents([ ])
  ],
  declarations: [
    PharmaComponent,
    HistoryComponent,
    StockupdateComponent,
    InventoryComponent,
    NotificationsComponent,
    AddNewDrugComponent
  ],
  exports: [
    PharmaComponent,
  ],

})

export class PharmaModule { }
