import { Component, OnInit , Input} from '@angular/core';
import { NavLink } from '../../models/util-types';
import { AuthService } from 'app/modules/auth/auth.service';



@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  @Input() navLinks: NavLink[];
  @Input() menuLinks;
  constructor(private authService: AuthService) { }

  public logout(){
    this.authService.logout();
  }

  ngOnInit() {
  }

}
