import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlertsService } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {
  loggedInDoctorsPersonIDs: number[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllLoggedInUsers().subscribe((data) =>
        this.loggedInDoctorsPersonIDs = data.filter(this._isDoctor)
                                            .map((item)=> item.user.person.id));
  }

  _isDoctor(loggedInObject):boolean{
    return loggedInObject.user.groups.filter(group => group.name=="DOCTOR").length != 0;
  }

}
