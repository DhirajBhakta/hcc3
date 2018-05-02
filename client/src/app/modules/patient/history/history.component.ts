import { Component, OnInit } from '@angular/core';
import { History } from './history.model';
import { Prescription } from '../../../models/prescription.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  prescriptions: any[];
  bundle: {};

  constructor(private service: PatientService) {}

  ngOnInit() {
    this.service.getPrescriptions().subscribe((response)=>{
      this.prescriptions = response;
      console.log(response)
    });
  }



}
