import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
 @Input() brief: boolean;
 @Input() bundle: object;

  constructor() { }

  ngOnInit() {
  }

}
