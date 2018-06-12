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
  patients_queue: any[] = [];
  flipped:boolean = false;
  showqueue:boolean = false;
  doctorID: number;
  username:string;
  family:any[] = [];
  constructor(private queueService: QueueService, private userService:UserService) {

  }

  ngOnInit() {
    this.doctorID = this.doctor.user.person.doctor;
    this.queueService.getQueue(this.doctorID)
      .subscribe((data)=> this.patients_queue = data.patients_queue);
  }

  flip(){
    this.flipped = !this.flipped;
    this.showqueue=false;
    this.family = [];
    this.username = "";
  }

  toggleShowQueue(){
    this.showqueue=!this.showqueue;
  }
  getFamily(){
    this.userService.getUser(this.username).subscribe((response) => {
      const patron = response.json().person;
      this.family = patron.dependants;
      this.family.unshift(patron);
    });
  }
  assignDoctorToMember(member){
    this.queueService.setAssignedDoctor(member.id, this.doctorID)
                     .subscribe(()=> this.flip());
  }
  resetAssignedDoctor(member){
    this.queueService.setAssignedDoctor(member.id,null)
                    .subscribe(()=> this.toggleShowQueue());
  }



}
