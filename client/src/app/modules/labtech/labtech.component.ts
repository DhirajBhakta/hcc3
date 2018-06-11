import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';

@Component({
  selector: 'app-labtech',
  templateUrl: './labtech.component.html',
  styleUrls: ['./labtech.component.css']
})
export class LabtechComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'Examination', path: 'examination'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
