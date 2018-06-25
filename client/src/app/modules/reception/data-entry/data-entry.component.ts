import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {

  patron_id;
  patron;
  name;
  blood_group;
  gender;
  birth_date;

  success;
  errors;

  constructor(private userService: UserService) { }

  verifyPatron() {
    this.userService.getUser(this.patron_id)
      .subscribe(data => {
        this.patron = data;
        console.log(data);
        this.errors = [];
      }, err => {
        this.errors = ['Error verifying patron'];
      });
  }
  submitData() {
    if (!this.validateData()) {
      return;
    }
    const date = this.birth_date.getFullYear() + '-' +
                 this.birth_date.getMonth() + '-' +
                 this.birth_date.getDate();
    this.userService.createDependant({
      name: this.name,
      patron: this.patron.person.id,
      gender: this.gender,
      date_of_birth: date,
      blood_group: this.blood_group,
      patient_type: 'DEPENDANT',
    }).subscribe(res => {
       console.log(res);
      this.success = 'Dependant ' + this.name + ' was successfully created ';
    }, err => {
      console.log(err);
      this.errors = ['Dependant could not be created due to error.'];
    });

  }

  validateData() {
    this.errors = [];
    if (this.name === undefined || this.name === '') {
      this.errors.push('Name cannot be left empty');
    }
    if ( this.blood_group === undefined || this.blood_group === '') {
      this.errors.push('Blood group must be selected');
    }
    if ( this.gender === undefined || this.gender === '') {
      this.errors.push('Gender must be selected');
    }
    if ( this.birth_date === undefined || this.birth_date === '') {
      this.errors.push('Birth date must be selected');
    }
    return this.errors.length === 0;
  }
  ngOnInit() {
  }

}
