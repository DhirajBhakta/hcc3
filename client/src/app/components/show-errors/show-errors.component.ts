import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

  @Input() errors;
  @Input() success;
  constructor() { }

  ngOnInit() {
  }

}
