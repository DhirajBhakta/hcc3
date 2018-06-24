import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'Appointments', path: 'appointment'},
  ];
  menuLinks = [
    {displayString: 'Profile', path: 'profile', icon: 'person'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
