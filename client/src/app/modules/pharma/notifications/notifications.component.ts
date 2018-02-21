import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications$: any;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notifications$ = this.notificationService.getData();
  }

}
