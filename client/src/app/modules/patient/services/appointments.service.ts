import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/last';


import { replaceKeys } from 'app/utils';


function log(Obs) {
  Obs.subscribe(d => console.log('LOGG:', d));
}


@Injectable()
export class AppointmentsService {
  url = 'http://localhost:3000/';
  appointmentData$;
  specialities$;
  specialityDatesMap$;
  num= 1;

  constructor(private http: HttpClient) { }

  requestData() {
    console.log('requesting data');
    this.appointmentData$ = this.http.get(this.url + 'appointmentBooking');
    this.specialities$ = this.appointmentData$.map(dataArray => dataArray.map((data) => data.speciality));
    this.specialityDatesMap$ = this.appointmentData$.map(dataArray => dataArray.reduce(function(acc, curr) {
      return acc.set(curr['speciality'], curr['validdates']);
    }, new Map()));

  }

  specialities(): Observable<any> {
    return this.specialities$;
  }

  getSpecialityDatesMap(): Observable<any> {
    return this.specialityDatesMap$;
  }



  /* details for the doctor matching the selected speciality and selected date*/
  // gets called after the user selects speciality and then the date
  getDoctorDetails(speciality: string, date: string) {
    let params = new HttpParams();
    params = params.append('speciality', speciality)
      .append('date', date);
    return this.http.get(this.url + 'doctors', { params: params })
      .map(data => replaceKeys(data, [
        { replace: 'doctorname', with: 'subtitle' },
        { replace: 'speciality', with: 'title' }
      ]));
  }

  postBookedAppointment(bundle){
    //send post request with reqired data to book the appointment;
    //if success, return true
    this.num = this.num + Math.floor(Math.random() * 200);
    bundle = replaceKeys(Object.assign({}, bundle), [
      {replace: 'subtitle', with: 'doctorname'},
      {replace: 'title', with: 'speciality'},
    ]);
    bundle['id'] = this.num;
    console.log('buunndle:', bundle);
    this.http.post(this.url + 'bookedAppointments', bundle).subscribe();
    return this.getBookedAppointments();
   }

  getBookedAppointments(): Observable<any> {
    return this.http.get<Array<any>>(this.url + 'bookedAppointments')
      .map(dataArray => dataArray.map((data) => replaceKeys(data, [
        { replace: 'doctorname', with: 'subtitle' },
        { replace: 'speciality', with: 'title' }
      ])));
  }

}
