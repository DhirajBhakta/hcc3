import { Component, OnInit } from '@angular/core';
import { History } from './history.model';
import { Prescription } from '../../../models/prescription.model';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyData: {};
  bundle: {};

  constructor(private service: HistoryService) {}

  ngOnInit() {
    this.historyData = this.service.getHistoryData();
  }
  call() {
    this.service.getRealHistoryData().subscribe(data => console.log(data));

  }

}
