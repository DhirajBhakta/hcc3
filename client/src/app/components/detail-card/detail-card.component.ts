import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Prescription } from '../../models/prescription.model';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})

export class DetailCardComponent implements OnInit {

  @Input() diagnosis: string;
  @Input() date: Date;
  @Input() name: string;
  @Input() prescriptionList: Prescription[];

  constructor() { }

  ngOnInit() {
    console.log(this.diagnosis);
    console.log(this.prescriptionList);
  }

}
