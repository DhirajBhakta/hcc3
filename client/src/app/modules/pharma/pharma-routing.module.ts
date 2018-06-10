import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PharmaComponent } from './pharma.component';
import { HistoryComponent } from './history/history.component';
import { StockupdateComponent } from './stockupdate/stockupdate.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '', component: PharmaComponent,
    children: [
      {path: '', redirectTo: 'notifications'},
      { path: 'inventory', component: InventoryComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'stockupdate', component: StockupdateComponent },
      { path: 'notifications', component: NotificationsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaRoutingModule { }
