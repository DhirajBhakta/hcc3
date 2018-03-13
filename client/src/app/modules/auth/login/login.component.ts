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

  public user_verified:boolean=false;
  public username: string=null;
  public password: string=null;
  public family: any[];

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  ngOnInit() { }

  onLogin() {
    if (this.username && this.password)
         this.authService.login(this.username, this.password).subscribe(() => {
              this.userService.getUser(this.username).subscribe((response)=>{
                      let patron = response.json().person;
                      this.family = patron.dependants;
                      this.family.unshift(patron);
                    });
              if(!this.authService.is_multi_profile)
                    this.navigateToHomePage();
        this.user_verified = true;
        });
  }


  navigateToHomePage(){
    this.router.navigateByUrl(this.authService.getRootURL());
  }
  setProfile(person){
    this.userService.setCurrentPerson(person);
    this.navigateToHomePage();
  }

}
