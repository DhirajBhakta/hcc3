import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie';


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
    this.password = null;
  }


  ngOnInit() {
  }

  onLogin() {
    if (this.username && this.password)
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log("User logged in, recieved response...", response);
          console.log("Cookie holds this token:",this.cookieService.get('Bearer'));
          this.router.navigateByUrl('/patient');
        }
      );
  }
}
