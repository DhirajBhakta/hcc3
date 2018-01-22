import { Component, OnInit } from '@angular/core';
import { History } from './history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: History[] = [
    new History('StomachAceh', new Date()),
    new History('Stomach Ache', new Date()),
  ];

  constructor() {}

  ngOnInit() {
    console.log(history[0]);
  }

}
