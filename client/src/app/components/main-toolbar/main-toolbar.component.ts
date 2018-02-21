import { Component, OnInit , Input} from '@angular/core';
import { NavLink } from '../../models/util-types';




@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  @Input() navLinks: NavLink[];
  @Input() menuLinks;
  constructor() { }

  ngOnInit() {
  }

}
