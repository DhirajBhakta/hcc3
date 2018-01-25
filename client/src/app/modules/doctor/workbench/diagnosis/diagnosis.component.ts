import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Diagnosis } from '../../../../models/diagnosis.model';
import { Validators } from '@angular/forms';
import { Prescription } from '../../../../models/prescription.model';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  currDiagnosis: Diagnosis;
  diagForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.diagForm = this.fb.group({
      diagnosis: ['', Validators.required],
      prescriptions: this.fb.array([this.fb.group(new Prescription())]),
    });
  }

  get prescriptions(): FormArray {
    return this.diagForm.get('prescriptions') as FormArray;
  }

  addRow() {
    this.prescriptions.push(this.fb.group(new Prescription()));
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
    const finalDiagnosis = this.prepareDiagnosis();
    console.log( finalDiagnosis);
    return finalDiagnosis;
  }

}
