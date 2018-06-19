import { Component, OnInit, Input } from '@angular/core';
import { QueueService } from '../services/queue.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {
  //personID of the doctor
  @Input() doctor__Person_id;
  doctor: any;
  patients_queue: any[] = [];
  token: number = 0;
  flipped: boolean = false;
  showqueue: boolean = false;
  username: string = "";
  family: any[] = [];
  GUEST_MODE: boolean = false;
  constructor(private queueService: QueueService, private userService: UserService) {

  }

  ngOnInit() {
    this.queueService.getDoctor(this.doctor__Person_id)
      .flatMap((doctor) => {
        this.doctor = doctor;
        return this.queueService.getQueue(doctor.id);
      })
      .subscribe((queue) =>{
      if(this.patients_queue.length != queue.length){
        this.patients_queue = queue.sort((item=>item.token));
        this.token = (queue.length!=0 ? queue[queue.length-1].token: 0) + 1;
    }});
  }

  flip() {
    this.flipped = !this.flipped;
  }

  toggleShowQueue() {
    this.showqueue = !this.showqueue;
  }

  resetDefaults() {
    this.showqueue = false;
    this.family = [];
    this.username = "";
    this.GUEST_MODE = false;
  }

  incrementToken() {
    this.token = this.token + 1;
    this.flip();
    this.resetDefaults();
  }


  submitGuestNameOrID() {
    if (this.GUEST_MODE){
      this.addToWaitingQueue(this.username);
    }
    else{
      console.log('cos im a chooth');
      this.userService.getFamily(this.username)
        .subscribe((family) => this.family = family);
      }
  }



  /**works for both normal and Guest patients
  * for normal patient ==> input: whole person object
  * for guest patient  ==> input: just name of the guest (bcos, new guest will be created everytime)
  */
  addToWaitingQueue(patient) {
    console.log('called me in add to waiting q');
    this.queueService.enqueue(patient, this.token, this.doctor.id)
      .subscribe(() => {console.log('enqueueueueueed');this.incrementToken()});
  }

  removeFromWaitingQueue(waiting_item) {
    this.queueService.dequeue(waiting_item)
      .subscribe(() => this.toggleShowQueue());
  }



}
