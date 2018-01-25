import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Prescription } from '../../../../../models/prescription.model';

@Component({
  selector: '[app-p-row]',
  templateUrl: './p-row.component.html',
  styleUrls: ['./p-row.component.css']
})
export class PRowComponent implements OnInit {

  @Input() prescription: Prescription;
  @Output() prescriptionChange: EventEmitter<Prescription>;


  onPrescriptionChange() {
    this.prescriptionChange.emit(this.prescription);
  }
  constructor() {
    this.prescriptionChange = new EventEmitter<Prescription>();
   }

  ngOnInit() {
    console.log(this.prescription);
  }

}
