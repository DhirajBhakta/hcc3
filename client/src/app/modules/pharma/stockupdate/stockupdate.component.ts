import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmaService } from '../services/pharma.service';
import { AlertsService } from '@jaspero/ng-alerts';
import  * as moment from 'moment';

@Component({
  selector: 'app-stockupdate',
  templateUrl: './stockupdate.component.html',
  styleUrls: ['./stockupdate.component.css']
})
export class StockupdateComponent implements OnInit {

  stock_update_form;
  drugs;

  constructor(private fb: FormBuilder, private phService: PharmaService, private _alerts: AlertsService) {
    this.stock_update_form = this.fb.group({
      'stock_drugs': this.fb.array([])
    });
  }

  ngOnInit() {
    this.addRow();
    this.phService.getDrugNames().subscribe((resp) => this.drugs = resp.json());
  }

  get stock_drugs(): FormArray {
    return this.stock_update_form.get('stock_drugs') as FormArray;
  };

  onDrugSelect(item, row_id) {
    this.stock_drugs.at(row_id).patchValue({ drug: item });
  }

  addRow() {
    this.stock_drugs.push(this.fb.group({
      'drug': ['', Validators.required],
      'quantity': ['', [Validators.pattern(/^\d+$/), Validators.required]],
      'batch': ['', Validators.required],
      'expiry_date': ['', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), Validators.required]],
      'rack': ['', Validators.required],
    }));
  }

  deleteRow(i) {
    this.stock_drugs.removeAt(i);
  }

  onSubmit() {
    let stock_drugs = this.stock_drugs.value.map((drug=>{
                              drug.expiry_date = moment(drug.expiry_date,["DD-MM-YYYY","DD-MM-YY"]).format("YYYY-MM-DD");
                              return drug;
                            }));
    this.phService.submitStockUpdate(stock_drugs).subscribe((resp) => {
                              if (Math.floor(resp.status / 100) == 2) {
                                this._alerts.create('success', 'New Stocks successfully submitted');
                                setInterval(() => window.location.reload(), 2000);
                              };
                            });
  }


}
