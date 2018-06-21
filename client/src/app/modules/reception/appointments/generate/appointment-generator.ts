import { AppointmentSpec } from '../../models/spec.model';
import { Appointment } from '../../models/appointment.model';

declare var require: any;

const moment = require('moment');

export class AppointmentGenerator {

  static copy_time(date: string, new_date: any) {
    const temp = moment(date);
    new_date.seconds(temp.seconds());
    new_date.minutes(temp.minutes());
    new_date.hours(temp.hours());
    return new_date.toISOString();
  }

  static is_day_required(day: number, spec: AppointmentSpec) {
    const checker = [spec.sunday, spec.monday, spec.tuesday, spec.wednesday,
                   spec.thursday, spec.friday, spec.saturday];
    return checker[day];
  }

  static is_week_required(week: number, spec: AppointmentSpec) {
    const checker = [spec.week1, spec.week2, spec.week3, spec.week4];
    return checker[week];
  }
  static generate_appointments(specs: AppointmentSpec[], start_date: Date, end_date: Date) {

    // This variable is to keep track of which time this month this day is occuring.
    // like 3rd tuesday 4th monday etc.
    let day_counter = new Array(0, 0, 0, 0, 0, 0, 0);
    const generated_appointments = new Array<Appointment>();

    const today = moment();
    const begin = moment(start_date);
    const end = moment(end_date);
    const months_start = moment(start_date).startOf('month');

    // step 1: Get count of days from beginning to month until this date.
    for (const iter = months_start; iter.isBefore(begin); iter.add(1, 'days')) {
      const day = iter.day();
      day_counter[iter] += 1;
    }

    // step 2: loop from the begin date to end date, day by day,
    //          if (new month ) reinitialize day_counter
    //          else
    //            for each appointmentspec,
    //              if details(week_no and day) match, then
    //                  create appt

    for (const iter = begin; iter.isBefore(end_date); iter.add(1, 'days')) {
      for (const spec of specs) {
        if (this.is_day_required(iter.day(), spec) &&
            (spec.all_weeks ||
             this.is_week_required(day_counter[iter.day()], spec))) {
          const start_time = this.copy_time(spec.start_time, iter);
          const end_time = this.copy_time(spec.end_time, iter);
          generated_appointments.push(new Appointment(spec.doctor_id, iter.toISOString(), start_time, end_time, spec.id));
        }
      }
      if (iter.date() === 1) {
        day_counter = new Array(0, 0, 0, 0, 0, 0, 0);
      }
      day_counter[iter.day()] += 1;
    }
    return generated_appointments;
  }
}
