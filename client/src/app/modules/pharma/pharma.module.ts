import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmaRoutingModule } from './pharma-routing.module';
import { PharmaComponent } from './pharma.component';
import { HistoryComponent } from './history/history.component';
import { StockupdateComponent } from './stockupdate/stockupdate.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    PharmaRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [
    PharmaComponent,
    HistoryComponent,
    StockupdateComponent,
    InventoryComponent,
    NotificationsComponent
  ],
  exports: [
    PharmaComponent,
  ],

})

export class PharmaModule { }
