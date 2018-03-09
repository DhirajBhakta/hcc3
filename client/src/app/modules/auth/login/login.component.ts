import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: String = null;
  public password: String = null;
  constructor(private authService: AuthService,
    private router: Router) {
    this.username = null;
    this.password = null;
  }


  ngOnInit() {
  }

  onLogin() {
    if (this.username && this.password)
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.authService.setSession(response);
          this.router.navigateByUrl(this.authService.getRootURL());
        }
      );
  }
}
