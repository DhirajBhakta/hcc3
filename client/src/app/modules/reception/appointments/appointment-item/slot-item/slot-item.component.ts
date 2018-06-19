import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slot-item',
  templateUrl: './slot-item.component.html',
  styleUrls: ['./slot-item.component.css']
})
export class SlotItemComponent implements OnInit {

  @Input() name;
  @Input() status;

  @Output()
  deleteSlot = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
