import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css']
})
export class PTableComponent implements OnInit {

  @Input() prescriptions : any;
  constructor() { }

  ngOnInit() {
  }

}
