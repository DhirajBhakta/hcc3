import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-stockupdate',
  templateUrl: './stockupdate.component.html',
  styleUrls: ['./stockupdate.component.css']
})
export class StockupdateComponent implements OnInit {

  stockUpdateForm;

  constructor(private fb: FormBuilder) {
    this.stockUpdateForm = this.fb.group({
      'stockDrugs': this.fb.array([])
    });
  }

  ngOnInit() {
    this.addRow();
  }


  get stockDrugs(): FormArray {
    return this.stockUpdateForm.get('stockDrugs') as FormArray;
  };

  addRow() {
    this.stockDrugs.push(this.fb.group({
      'genericName': ['', Validators.required],
      'quantity': ['', [Validators.pattern(/^\d+$/), Validators.required]],
      'batch': ['', Validators.required],
      'expiryDate': ['', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), Validators.required]],
      'rack': ['', Validators.required],
    }));
  }

  deleteRow(i) {
    this.stockDrugs.removeAt(i);
  }

  onSubmit(){
    console.log('Submitted');
  }
}
