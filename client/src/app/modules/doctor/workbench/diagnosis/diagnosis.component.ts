import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Diagnosis } from '../../../../models/diagnosis.model';
import { Validators } from '@angular/forms';
import { Prescription } from '../../../../models/prescription.model';
import { AbstractControl } from '@angular/forms/src/model';
import { AbstractControlDirective } from '@angular/forms/src/directives/abstract_control_directive';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  currDiagnosis: Diagnosis;
  diagForm: FormGroup;
  presGroup = {
        drugname : ['', Validators.required],
        quantity : ['', Validators.compose([Validators.pattern(/^\d+$/), Validators.required])],
        schedule : ['', Validators.required],
        comments : ['', Validators.required],
      };

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.diagForm = this.fb.group({
      diagnosis: ['', Validators.required],
      prescriptions: this.fb.array([this.fb.group(this.presGroup)]),
    });
  }

  get prescriptions(): FormArray {
    return this.diagForm.get('prescriptions') as FormArray;
  }

  getField(form: FormGroup, field: string): AbstractControl | AbstractControlDirective {

    return form.get(field);
  }

  addRow() {
    this.prescriptions.push(this.fb.group(this.presGroup));
  }
  deleteRow(i) {
    this.prescriptions.removeAt(i);
  }
  ngOnInit() {
  }
  prepareDiagnosis() {
    const formModel = this.diagForm.value;
    const prescriptionsCopy: Prescription[] = formModel.prescriptions.map(
       prescription => Object.assign({}, prescription));

    const finalDiagnosis: Diagnosis = {
      patientID: '0',
      doctorID: '0',
      diagnosis: formModel.diagnosis,
      prescriptions: prescriptionsCopy
    };
    return finalDiagnosis;

  }
  onSubmit() {
    console.log(this.diagForm.controls.prescriptions);
    const finalDiagnosis = this.prepareDiagnosis();
    console.log( finalDiagnosis);
    return finalDiagnosis;
  }

}
