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
import { NotificationService } from './services/notification.service';
import { PTableComponent } from './notifications/p-table/p-table.component';


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
    NotificationsComponent,
    PTableComponent
  ],
  providers: [
    NotificationService
  ],
  exports: [
    PharmaComponent,
  ],

})

export class PharmaModule { }
