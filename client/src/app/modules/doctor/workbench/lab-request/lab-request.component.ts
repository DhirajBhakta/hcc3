import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lab-request',
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.component.css']
})
export class LabRequestComponent implements OnInit {

  @Input () onSubmit;
  constructor() { }

  ngOnInit() {
  }

  isFormPristine(form){
    for(let property in form.value)
      if(form.value.hasOwnProperty(property))
        if(form.value[property] == true)
          return false;
    return true;
  }
}
