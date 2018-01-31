import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';

@Component({
  selector: 'app-pharma',
  templateUrl: './pharma.component.html',
  styleUrls: ['./pharma.component.css']
})
export class PharmaComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'Notifications', path: 'notifications'},
    {displayString: 'History', path: 'history'},
    {displayString: 'Stock Update', path: 'stockupdate'},
    {displayString: 'Inventory', path: 'inventory'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
