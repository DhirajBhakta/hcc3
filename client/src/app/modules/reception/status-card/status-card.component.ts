import { Component, OnInit ,Input} from '@angular/core';
import { QueueService } from '../services/queue.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {
  @Input() doctor;
  doctorID: number;
  specialization:string;
  patients_queue: any[] = [];
  token:number = 0;
  flipped:boolean = false;
  showqueue:boolean = false;
  username:string="";
  family:any[] = [];
  isGuest:boolean=false;
  constructor(private queueService: QueueService, private userService:UserService) {

  }

  ngOnInit() {
    this.doctorID = this.doctor.user.person.doctor;
    this.queueService.getSpecialization(this.doctorID)
      .subscribe((specialization) => this.specialization = specialization);
    this.queueService.getQueue(this.doctorID)
      .subscribe((queue)=> this.patients_queue = queue);
  }

  flip(){
    this.flipped = !this.flipped;
  }

  toggleShowQueue(){
    this.showqueue=!this.showqueue;
  }

  resetDefaults(){
    this.showqueue=false;
    this.family = [];
    this.username = "";
    this.isGuest=false;
  }

  incrementToken(){
    this.token = this.token + 1;
    this.flip();
    this.resetDefaults();
  }


  submitGuestNameOrID(){
      if(this.isGuest)
        this.assignDoctor(this.username);
      else
        this._getFamily();
  }
  _getFamily(){
    this.userService.getUser(this.username).subscribe((response) => {
      const patron = response.json().person;
      this.family = patron.dependants;
      this.family.unshift(patron);
    });
  }


  /**works for both normal and Guest patients
  * for normal patient ==> input: whole person object (PATCH REQUEST)
  * for guest patient  ==> input: just name of the guest (bcos, new guest will be created everytime) (POST REQUEST)
  */
  assignDoctor(patient){
    this.queueService.setAssignedDoctor(patient,this.token, this.doctorID)
                     .subscribe(()=> this.incrementToken());
  }

  resetAssignedDoctor(patient){
    this.queueService.resetAssignedDoctor(patient)
                    .subscribe(()=> this.toggleShowQueue());
  }



}
