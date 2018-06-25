import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/util-types';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import {UserService} from 'app/services/user.service';


@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  navLinks: NavLink[] = [
    {displayString: 'Workbench', path: 'workbench'},
    {displayString: 'Timetable', path: 'timetable'},
    {displayString: 'Appointments', path: 'appointments'},
    {displayString: 'Data Entry', path: 'data-entry'},
  ];


  constructor(private http: JWTHttpClient) { }

  ngOnInit() {

  }

}
