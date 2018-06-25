import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AppointmentsService } from '../../reception/services/appointments.service';

import { Observable } from 'rxjs/Observable';
import { OBSERVABLE_MEDIA_PROVIDER } from '@angular/flex-layout';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appts$;
  constructor(private aptService: AppointmentsService,
              private userService: UserService) {

                this.appts$ = this.userService.getCurrentUser()
                                .flatMap(user => {
                                  return this.userService.getFamily(user.username);
                                })
                                .flatMap(persons => {
                                  return Observable.concat(Observable.forkJoin(persons.map(person => {
                                    return this.aptService.getSlotsWithAppointments({'patient' : person.id});
                                  })));
                                });

   }

   getStatus(status) {
     switch (status) {
       case 'BO': return 'Booked';
       case 'BC': return 'Booked and Confirmed';
       case 'RJ': return 'Rejected';
       case 'UC': return 'Unconfirmed';
       case 'WL': return 'Waiting List';
       default: return 'Unknown';
     }
   }
  ngOnInit() {
  }

}
