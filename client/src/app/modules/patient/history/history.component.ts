import { Component, OnInit } from '@angular/core';
import { History } from './history.model';
import { Prescription } from '../../../models/prescription.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  p1: Prescription[] = [
    {drugname : 'Aspirin', quantity : '10', schedule : '1-0-1', comments : 'Before food' },
    {drugname : 'Paracetamol', quantity : '3', schedule : '0-0-1', comments : 'AF' },
    {drugname : 'Eldofer', quantity : '1', schedule : '0-1-1', comments : 'AF' },
    {drugname : 'Titunis', quantity : '15', schedule : '1-0-1', comments : 'AF' },
  ];

  history: History[] = [
    {diagnosis : 'Stomach Ache', date : new Date(), name : 'Dr. Krishna Mohan', prescriptionList :  this.p1},
    {diagnosis : 'Fever', date : new Date(), name : 'Dr. Rammoorthy Krisnan', prescriptionList : this.p1},
  ];

  constructor() {}

  ngOnInit() {
  }

}
