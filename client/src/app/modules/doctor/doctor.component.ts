import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'WorkBench', path: 'workbench'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
