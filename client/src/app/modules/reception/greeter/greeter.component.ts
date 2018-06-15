import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlertsService } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {
  bundle:{};
  loggedInDoctorsPersonIDs:any[];
  constructor(private userService: UserService, private _alerts: AlertsService) {
    this.userService.getAllLoggedInUsers().subscribe((data) =>
        this.loggedInDoctorsPersonIDs = data.filter((item)=>item.user.groups[0].name=="DOCTOR")
                                   .map((item)=> item.user.person.id);
      );
  }
  ngOnInit() {
  }

}
