import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { EventEmitter } from '@angular/core';

import 'rxjs/add/operator/concat';
@Component({

  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications$: any[];
  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    // this.notifications$ = this.notificationService.getData();
    this.notifications$ = [];

    this.notificationService.getData(status = 'S')
      .subscribe(x => {
        console.log(x);
        x.map(y => {
          console.log(y);
          this.notifications$.push(y['prescription']);
          console.log(this.notifications$);
      }); });

    this.notificationService.loopForData()
      .subscribe(x => {
        x.map(y => {
          this.notifications$.unshift(y['prescription']);
           }); });
  }
  sendData(batchList) {
    for (const batch of batchList) {
      this.notificationService.createDispensed(batch)
        .subscribe(response => console.log(response));
    }
  }

}
