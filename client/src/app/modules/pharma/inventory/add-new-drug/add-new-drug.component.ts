import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-new-drug',
  templateUrl: './add-new-drug.component.html',
  styleUrls: ['./add-new-drug.component.css']
})
export class AddNewDrugComponent implements OnInit {

  racks=['1','2','3','4a','4b','quickAccess'];
  addNewDrugForm;

  constructor(private _fb: FormBuilder) {
    this.addNewDrugForm = this._fb.group({
      tradeName: ['', Validators.required],
      genericName: ['', Validators.required],
      rack: ['',Validators.required]
    });
  }
  ngOnInit() {
  }

}
