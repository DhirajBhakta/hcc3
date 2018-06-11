import { Component, OnInit ,Input} from '@angular/core';
import { QueueService } from '../services/queue.service';

@Component({
  selector: 'status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {
  @Input() doctor;
  count = 0;
  flipped:boolean = false;
  doctorID: number;
  constructor(private queueService: QueueService) {
    this.doctorID = this.doctor.user.person.doctor;
    this.queueService.getQueue(this.doctorID);
  }

  ngOnInit() {
  }

  flip(){
    this.flipped = !this.flipped;
  }
  incrementCount(){
    this.count = this.count+1;
  }


}
