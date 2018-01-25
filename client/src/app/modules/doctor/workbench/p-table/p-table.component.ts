import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../../models/prescription.model';

@Component({
  selector: 'app-p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css']
})
export class PTableComponent implements OnInit {

  prescriptions: Prescription[];

  constructor() { }

  ngOnInit() {
    this.prescriptions = [];
    this.prescriptions.push(new Prescription('', '', '', ''));
  }
  logPs() {
    console.log(this.prescriptions);
  }
  addRow() {
    console.log('Adding row');
    this.prescriptions.push(new Prescription('', '', '', ''));
  }

}
