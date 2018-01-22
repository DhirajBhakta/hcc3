import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit {

  @Input() diagnosis: string;
  @Input() date: Date;

  constructor() { }

  ngOnInit() {
  }

}
