import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  template: `
  <ul *ngIf="existErrors()">
    <li style="color : red" *ngFor="let error of listOfErrors()">{{error}}</li>
  </ul>
  `
})
export class ShowErrorsComponent implements OnInit {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
 };

  @Input() control: AbstractControl | AbstractControlDirective;
  constructor() { }

  ngOnInit() {
  }

  existErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
