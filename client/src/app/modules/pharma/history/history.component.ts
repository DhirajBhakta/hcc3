import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  columnDefs;
  rowData$;
  selectedPrescription;

  constructor(private historyService: HistoryService) {
        this.columnDefs = [
            {headerName: 'Patient-Name', field: 'patient_name'},
            {headerName: 'Doctor-Name', field: 'doctor_name'},
            {headerName: 'Date-Time', field: 'date'},
            {headerName: 'Prescription', field: 'diagnosis', cellRenderer: function(params) { return '<a>' + params.value + '</a>'; }},

        ];

        this.selectedPrescription = null;

      }

  ngOnInit() {
    this.rowData$ = this.historyService.getData();
  }
  onCellClicked(data) {
    console.log(data)
    this.selectedPrescription = data.data;
  }
}
