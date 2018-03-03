import { Component, OnInit } from '@angular/core';


import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService) { this.user = new User('', ''); }


  ngOnInit() {
  }

  onLogin() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(response => console.log(response));
  }
}
