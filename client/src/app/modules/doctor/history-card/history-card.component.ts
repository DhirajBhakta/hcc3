import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'patient-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {
  @Input () bundle:any;
  constructor() { }

  ngOnInit() {
  }

  showDetails(){

  }

}
