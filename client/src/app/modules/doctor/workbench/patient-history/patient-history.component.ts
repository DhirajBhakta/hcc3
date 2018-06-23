import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  @Input () history;
  @Input () labreports;
  constructor() { }

  ngOnInit() {
  }

  openLabreport(report){
    window.open('doctor/labreport/'+report.id, '_blank');
  }

}
