import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PharmaService } from '../../services/pharma.service';
import { AlertsService } from '@jaspero/ng-alerts';


@Component({
  selector: 'app-add-new-drug',
  templateUrl: './add-new-drug.component.html',
  styleUrls: ['./add-new-drug.component.css']
})
export class AddNewDrugComponent implements OnInit {

  add_new_drug_form;

  constructor(private _fb: FormBuilder, private phService: PharmaService, private _alerts: AlertsService) {
    this.add_new_drug_form = this._fb.group({
      trade_name: ['', Validators.required],
      generic_name: ['', Validators.required],
    });
  }
  ngOnInit() {
  }

  onSubmit() {
    const new_drug = this.add_new_drug_form.value;
    this.phService.submitNewDrug(new_drug).subscribe((resp) => {
                              if (Math.floor(resp.status / 100) == 2) {
                                this._alerts.create('success', 'New Drug successfully submitted');
                                this.add_new_drug_form.reset();
                              }
                            });
  }

}
