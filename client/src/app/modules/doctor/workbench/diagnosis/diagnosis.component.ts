import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Prescription } from '../../../../models/prescription.model';
import { AbstractControl } from '@angular/forms/src/model';
import { AbstractControlDirective } from '@angular/forms/src/directives/abstract_control_directive';
import { WorkbenchService } from '../../services/workbench.service';
import {AlertsService} from '@jaspero/ng-alerts';


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  drugs: any[];
  currDiagnosis;
  diagForm: FormGroup;
  presGroup = {
    drug_id: ['', Validators.required],
    quantity: ['', Validators.compose([Validators.pattern(/^\d+$/), Validators.required])],
    comments: ['', Validators.required],
  };

  constructor(private fb: FormBuilder, private wbService: WorkbenchService, private _alerts:AlertsService) {
    this.diagForm = this.fb.group({
      indication: ['', Validators.required],
      prescribed_drugs: this.fb.array([this.fb.group(this.presGroup)]),
    });
  }

  ngOnInit() {
    this.wbService.getDrugNames().subscribe((res) => this.drugs = res.json());
  }

  get prescribed_drugs(): FormArray {
    return this.diagForm.get('prescribed_drugs') as FormArray;
  }

  onDrugSelect(item, row_id) {
    this.prescribed_drugs.at(row_id).patchValue({ drug_id: item });
  }

  addRow() {
    this.prescribed_drugs.push(this.fb.group(this.presGroup));
  }

  deleteRow(i) {
    this.prescribed_drugs.removeAt(i);
  }

  onSubmit() {
    const indication = this.diagForm.value.indication;
    const prescribed_drugs = this.diagForm.value.prescribed_drugs;
    const prescription = {
      patient_id: this.wbService.getPatientID(),
      indication: indication,
      prescribed_drugs: prescribed_drugs
    };
    console.log(prescription)
    this.wbService.submitPrescription(prescription).subscribe(res => {
      if(Math.floor(res.status/100) == 2){
        this._alerts.create( 'success', 'Prescription successfully submitted');
        setInterval(()=>window.location.reload(),2000);
      }
    })
  }

}
