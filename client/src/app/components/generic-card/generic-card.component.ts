import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent implements OnInit {

 @Input() bundle: {};
 @Output() onCancel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  triggerCancel(): void {
    this.onCancel.emit();
  }
}
