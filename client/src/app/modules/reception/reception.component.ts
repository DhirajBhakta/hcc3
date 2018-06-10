import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'Greeter', path: 'greeter'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
