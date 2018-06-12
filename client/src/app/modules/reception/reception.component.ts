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
    {displayString: 'Greeter', path: 'greeter'},
    {displayString: 'Timetable', path: 'timetable'},
  ];


  constructor(private http: JWTHttpClient, private userService: UserService) { }

  ngOnInit() {

  }

}
