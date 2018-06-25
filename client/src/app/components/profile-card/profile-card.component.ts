import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
 @Input() brief: boolean;
 bundle: object;

  constructor(private userService: UserService) {
    this.userService.getCurrentPerson()
      .subscribe(data => {
        this.bundle = data;
      });
   }

  ngOnInit() {
  }

}
