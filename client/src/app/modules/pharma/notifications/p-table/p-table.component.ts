import { Component, Input, OnInit, Output,  EventEmitter } from '@angular/core';
import { BatchItem } from './batch-item';

type storeMap = Map<String, Number>;

@Component({
  selector: 'app-p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css']
})


export class PTableComponent implements OnInit {

  /*
    drugMap : Keep track of the drugs and batches and quantities in terms of local index.
        Example : {0 : [{0: 1, 1 : 2}]}
        is in format { drug1_id : [{batch_1 : batch1_qty,
                                    batch_2 : batch2_qty}]}
        This is later converted to drugList which is the right format for sending data serverside.

    drugList : Finalized data to be POSTed to server.
    remainingMap : Keeps track of the remaining qty to be fulfilled for each drug. Is updated along with
                   drugMap
  */
  prescriptions: any;
  batchList: Array<BatchItem>;
  drugMap: any;
  remainingMap: any;
  errors: Array<string>;

  @Input() set pres(inp_pres: any) {
    this.prescriptions = inp_pres;
    this.calcRemaining();
  }
  @Input() prescription_id;
  @Output() completionEvent: EventEmitter<any>;

  constructor() {
    this.drugMap = {};
    this.remainingMap = {};
    this.completionEvent = new EventEmitter<any>();
   }


  ngOnInit() {
  }

  isEmpty(obj) {
    for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
    return true;
  }

  colorChange(drug, batch, target) {
    /* Function to change colors of the target input box based on whether limit
       is crossed or not.
    */
    if (target.value > this.prescriptions[drug].drug.batches[batch].quantity || target.value < 0) {
      target.style.backgroundColor = '#f55';
    } else {
      target.style.backgroundColor = '#fff';
    }
  }
  insertBatchMap(drug, batch, qty) {
    /*
    Step 1 :

    */
    if (this.drugMap[drug] === undefined) {
      this.drugMap[drug] = {};
    }
    this.drugMap[drug][batch] = parseInt(qty, 10);
    if (qty === '' || qty === '0') {
      delete this.drugMap[drug][batch];
      if (this.isEmpty(this.drugMap[drug])) {
        delete this.drugMap[drug];
      }
    }
    this.calcRemaining();
  }
  /*
  Correct format is
  [
    {
      batch_id : 0,
      pharmarecord: <prescription_id>,
      quantity : <int>
    },
  ]
  */
  correctFormat() {
    this.batchList = new Array<BatchItem>();
    for (const key of Object.keys(this.drugMap)) {
      for (const batch of Object.keys(this.drugMap[key])) {
        const batch_id = this.prescriptions[key].drug.batches[batch].id;
        this.batchList.push(new BatchItem(batch_id, this.drugMap[key][batch], this.prescription_id));
      }
    }
    console.log(this.batchList);
    this.completionEvent.emit(this.batchList);
  }
  calcRemaining() {
    console.log(Object.keys(this.prescriptions));
    for (const drug_id of Object.keys(this.prescriptions)) {
      let rem = this.prescriptions[drug_id].quantity;
      if (this.drugMap[drug_id] !== undefined) {
        rem = rem - Object.keys(this.drugMap[drug_id])
                          .reduce((acc, curr) =>
                                    acc + this.drugMap[drug_id][curr]
                                    , 0);
      }
      this.remainingMap[drug_id] = rem;
    }
  }
  validate() {
    this.errors = [];
    for (const key of Object.keys(this.remainingMap)) {
      if (this.remainingMap[key] !== 0) {
        this.errors.push('The sum of the quantities from store does not add up to the remaining');
        break;
      }
    }
    if (Object.keys(this.drugMap).length !== Object.keys(this.prescriptions).length) {
      this.errors.push('All the drugs haven\'t been added');
    }
    for (const key of Object.keys(this.drugMap)) {
      for (const batch of Object.keys(this.drugMap[key])) {
        if (this.drugMap[key][batch] > this.prescriptions[key].drug.batches[batch].quantity) {
          this.errors.push('More drugs have been allocated than available in the batch');
        }
        if (this.drugMap[key][batch] < 0) {
          this.errors.push('Negative drugs are not allowed');
        }
      }
    }
    if (this.errors.length === 0) {
      delete this.errors;
      this.correctFormat();
    }
  }
}
