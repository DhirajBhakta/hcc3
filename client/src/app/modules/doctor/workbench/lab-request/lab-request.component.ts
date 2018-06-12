import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lab-request',
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.component.css']
})
export class LabRequestComponent implements OnInit {

  labRequestForm = {
    "bloodGroup":false,
    "RH":false,
    "completeHemogram":false,
    "ESR":false,
    "HB":false,
    "bleedingTime":false,
    "clottingTime":false,
    "bloodSugarFasting":false,
    "bloodSugarPostPrandial":false,
    "bloodSugarRandom":false,
    "uricAcid":false,
    "MP":false,
    "widal":false,
    "sugar":false,
    "albumin":false,
    "bileSalts":false,
    "bilePigments":false,
    "microscopy":false,
    "ova":false,
    "cyst":false,
    "bloodSugarFasting2":false,
    "bloodSugarRandom2":false,
    "bloodSugarPostPrandial2":false,
    "serumUrea":false,
    "serumCreatinine":false,
    "serumCholestrol":false,
    "HDL":false,
    "LDL":false,
    "TC_HDL":false,
    "triglycerides":false,
    "LFTSerumProtein":false,
    "LFTSerumAlbumin":false,
    "LFTSerumGlobulin":false,
  }
  constructor() { }

  ngOnInit() {
  }

}
