import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { replaceKeys } from 'app/utils';

@Injectable()
export class AppointmentsService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getSpecialities():Observable<any>{
    return this.http.get(this.url + 'specialities');
  }
  
  getBookedAppointments(): Observable<any> {
    return this.http.get<Array<any>>(this.url + 'bookedAppointments')
      .map(dataArray => dataArray.map((data) => replaceKeys(data, [
        { replace: 'doctorname', with: 'subtitle' },
        { replace: 'speciality', with: 'title' }
      ])));
  }

}
