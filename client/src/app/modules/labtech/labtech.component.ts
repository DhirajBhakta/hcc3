import { Component, OnInit } from '@angular/core';

import { LabtechService } from './services/labtech.service';

@Component({
  selector: 'app-labtech',
  templateUrl: './labtech.component.html',
  styleUrls: ['./labtech.component.css']
})
export class LabtechComponent implements OnInit {
  navLinks:any[]=[];
  notifications:any[]=[];
  currentRequest:any = null;
  v=3;

  constructor(private labtechService:LabtechService) { }

  ngOnInit() {
    this.labtechService.getNotifications().subscribe((labrequests)=>this.notifications=labrequests);
  }
  setCurrentRequest(request){
    this.currentRequest = request;
  }


}
