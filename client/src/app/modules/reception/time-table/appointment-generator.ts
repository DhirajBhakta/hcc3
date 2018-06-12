import { AppointmentSpec } from './spec-form/spec.model';
import { Appointment } from './appointment';

const moment = require('moment');

export class AppointmentGenerator {

  getDaysFromSpec(spec: AppointmentSpec) {
    const days = [];
    if(spec.sunday) days.push(0);
    if(spec.monday) days.push(1);
    if(spec.tuesday) days.push(2);
    if(spec.wednesday) days.push(3);
    if(spec.thursday) days.push(4);
    if(spec.friday) days.push(5);
    if(spec.saturday) days.push(6);
    return days;
  }

  generate_appointments(spec: AppointmentSpec, start_date: Date, end_date: Date) {
    const day_week_map = new Array(0, 0, 0, 0, 0, 0, 0);
    const today = moment();
    const start_day = moment().startOf('month').day();
    const todays_day = moment().date();

    for (let i = start_day; i <= 6; i++) {
      if( i>= start_day) {
      }
       day_week_map[i] = 1;
    }
    for (var m = moment(start_date); m.isBefore(end_date); m.add(1, 'days')) {
    }
    if (spec.all_weeks) {


    }
  }
}
