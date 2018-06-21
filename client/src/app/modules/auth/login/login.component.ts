import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_verified= false;
  public username: string= null;
  public password: string= null;
  public family: any[];
  public incorrectLogin = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  ngOnInit() { }

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(() => {
        if (!this.authService.is_multi_profile) {
          this.userService.getUser(this.username).subscribe((user)=>this.setProfile(user.person));
        }
        else{
        this.userService.getFamily(this.username).subscribe((family) =>this.family = family);
      }

        this.user_verified = true;
      }, (error: any) =>  { if (error.status === 400) { this.incorrectLogin = true; } } );
    }
  }

  navigateToHomePage(){
    this.router.navigateByUrl(this.authService.getRootURL());
  }
  setProfile(person){
    this.userService.setCurrentPerson(person);
    this.navigateToHomePage();
  }

}
