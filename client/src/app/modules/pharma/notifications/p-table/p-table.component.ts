import { Component, Input, OnInit } from '@angular/core';
import { StoreItem, DrugItem } from './store-item';

type storeMap = Map<String, Number>;

@Component({
  selector: 'app-p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css']
})


export class PTableComponent implements OnInit {

  prescriptions: any;
  drugList: Array<DrugItem>;
  drugMap: any;
  remainingMap: any;
  errors: Array<string>;

  @Input() set pres(inp_pres: any) {
    this.prescriptions = inp_pres;
    this.calcRemaining();
  }
  constructor() {
    this.drugMap = {};
    this.remainingMap = {};
   }

  ngOnInit() {
  }

  isEmpty(obj) {
    for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
    return true;
  }

  colorChange(drug, store, target) {
    if (target.value > this.prescriptions[drug].stores[store].quantity || target.value < 0) {
      target.style.backgroundColor = '#f55';
    } else {
      target.style.backgroundColor = '#fff';
    }
  }
  insertStoreMap(drug, store, qty) {
    if (this.drugMap[drug] === undefined) {
      this.drugMap[drug] = {};
    }
    this.drugMap[drug][store] = parseInt(qty, 10);
    if (qty === '' || qty === '0') {
      delete this.drugMap[drug][store];
      if (this.isEmpty(this.drugMap[drug])) {
        delete this.drugMap[drug];
      }
    }
    this.calcRemaining();
  }
  correctFormat() {
    this.drugList = new Array<DrugItem>();
    for (const key of Object.keys(this.drugMap)) {
      const drug_id = this.prescriptions[key].drug_id;
      const storeList = new Array<StoreItem>();
      this.drugList.push(new DrugItem(drug_id, storeList));
      for (const store of Object.keys(this.drugMap[key])) {
        const store_id = this.prescriptions[key].stores[store].store_id;
        storeList.push(new StoreItem(store_id, this.drugMap[key][store]));
      }
    }
  }
  calcRemaining() {
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
      for (const store of Object.keys(this.drugMap[key])) {
        if (this.drugMap[key][store] > this.prescriptions[key].stores[store].quantity) {
          this.errors.push('More drugs have been allocated than available in the store');
        }
        if (this.drugMap[key][store] < 0) {
          this.errors.push('Negative drugs are not allowed')
        }
      }
    }
    if (this.errors.length === 0) {
      delete this.errors;
      this.correctFormat();
    }
  }
}
