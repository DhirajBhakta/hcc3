import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent implements OnInit {

 @Input() bundle: {};
 @Input() canCancel: boolean;
 @Input() canConfirm: boolean;

 @Output() Cancel: EventEmitter<any> = new EventEmitter();
 @Output() Confirm: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  triggerCancel(): void {
    this.Cancel.emit();
  }

  triggerConfirm(): void {
    console.log('confirm clicked! emit triggered');
    this.Confirm.emit();
  }


}
