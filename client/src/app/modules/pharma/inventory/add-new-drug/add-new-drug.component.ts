import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-new-drug',
  templateUrl: './add-new-drug.component.html',
  styleUrls: ['./add-new-drug.component.css']
})
export class AddNewDrugComponent implements OnInit {

  addNewDrugForm;

  constructor(private _fb: FormBuilder) {
    this.addNewDrugForm = this._fb.group({
      tradeName: ['', Validators.required],
      genericName: ['', Validators.required],
    });
  }
  ngOnInit() {
  }

}
