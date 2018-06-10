import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  columnDefs;
  rowData$;
  selectedPrescription;
  selectedDrugs;

  constructor(private notificationService: NotificationService) {
        this.columnDefs = [
            {headerName: 'Patient-Name', valueGetter: function(params) {return params.data.prescription.patient.name; }},
            {headerName: 'Doctor-Name', valueGetter: function(params) {return params.data.prescription.doctor.id; }},
            {headerName: 'Date-Time', valueGetter: function(params) {return params.data.prescription.date_time; }},
            {headerName: 'Prescription', valueGetter: function(params) {return params.data.prescription.indication; },
              cellRenderer: function(params) {
                  return '<a>' + params.value + '</a>'; }},

        ];

        this.selectedPrescription = null;
        this.selectedDrugs = null;

      }

  ngOnInit() {
    this.rowData$ = this.notificationService.getData(status = 'A');
  }

  onCellClicked(data) {
    console.log(data);
    this.selectedPrescription = data.data.prescription;
    const dispensedBatches = data.data.dispensed_drugs;
    const drugMap = {};

    for (const batch_info of dispensedBatches) {
      if (drugMap[batch_info.batch.drug] === undefined) {
        drugMap[batch_info.batch.drug] = [];
      }
      drugMap[batch_info.batch.drug].push(batch_info);
    }
    console.log(drugMap);
    this.selectedDrugs = Object.keys(drugMap)
      .map(function(key) {
        return { 'name': key,
                 'quantity': drugMap[key].reduce((acc, cur) => acc + cur.quantity, 0),
                 'batchList': drugMap[key]
               };
              });
    console.log(this.selectedDrugs);


  }
}
