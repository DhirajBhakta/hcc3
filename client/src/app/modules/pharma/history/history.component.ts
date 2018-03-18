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
            {headerName: 'Patient-Name', valueGetter: function(params) {return params.data.prescription.patient.name;}},
            {headerName: 'Doctor-Name', valueGetter: function(params) {return params.data.prescription.doctor.id;}},
            {headerName: 'Date-Time', valueGetter: function(params) {return params.data.prescription.date_time;}},
            {headerName: 'Prescription', valueGetter: function(params) {return params.data.prescription.indication;},
              cellRenderer: function(params) {
                  return '<a>' + params.value + '</a>'; }},

        ];

        this.selectedPrescription = null;
        this.selectedDrugs = null;

      }

  ngOnInit() {
    this.rowData$ = this.notificationService.getData(status = 'A');
  }

  calcBatchForPrescribed(dispensed_batches, selectedDrugs) {
    /*
    This method correlates fields between prescribed drugs from prescription and
    dispensed_drug from the pharma record.
    Currently pharmarecord data is so : 
    {
      prescription : {doctor: asdas, patient : asads, prescribed_drugs : [druginfo :[batchinfo], druginfo :[batchinfo] ]}
      dispensed_data : [batchinfo, batchinfo ]
    }
    Dispensed data doesn't have drug info, only drug_id . So the data is correlated from prescribed drugs. 
    3 steps
    --------
    1st step : Iterate through the selectedDrugs, ie, prescribed_drugs and add their drug_ids to a map
    2nd step : Add the batch to relevant drug in map
    3rd step : Reinsert the relevant batches info to a ew field called batchList.
    */
    const drugMap = {};
    for (let i = 0; i < selectedDrugs.length; i++) {
      const drug_id = selectedDrugs[i].drug.id;
      drugMap[drug_id] = [];
    }
    for (const batch_info of dispensed_batches) {
      const drug_id = batch_info.batch.drug;
      drugMap[drug_id].push(batch_info);
    }
    for (let i = 0; i < selectedDrugs.length; i++) {
      const drug_id = selectedDrugs[i].drug.id;
      selectedDrugs[i].batchList = drugMap[drug_id]; 
    }
    return selectedDrugs;

  }

  onCellClicked(data) {
    console.log(data)
    this.selectedPrescription = data.data.prescription;
    let selectedDrugs;
    if (data.data.dispensed_drugs.length !== 0) {
      selectedDrugs = data.data.prescription.prescribed_drugs;
    }
    /*
    */
    const dispensedBatches = data.data.dispensed_drugs;
    this.selectedDrugs = this.calcBatchForPrescribed(dispensedBatches, selectedDrugs );
    console.log(this.selectedDrugs);


  }
}
