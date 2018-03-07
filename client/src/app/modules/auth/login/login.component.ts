import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'app/models/user.model';
import { AuthService } from '../auth.service';
import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: String = null;
  public password: String = null;
  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService) {
    this.username = null;
    this.pasword = null;
  }


  ngOnInit() {
  }

  onLogin() {
    console.log(this.user);
    if (this.username && this.password)
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log("User logged in, recieved response...", response.json());
          console.log("Cookie holds this token:",this.cookieService.get('Bearer'));
          this.router.navigateByUrl('/patient');
        }
      );
  }
}
