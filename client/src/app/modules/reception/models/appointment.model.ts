export class Appointment {
  id = 0;
  doctor_id: number;
  spec_id: number;
  date: string;
  start_time: string;
  end_time: string;

  public constructor (doctor_id: number,
              date: string,
              start_time: string,
              end_time: string,
              spec_id: number = null) {
                this.doctor_id = doctor_id;
                this.spec_id = spec_id;
                this.date = date;
                this.start_time = start_time;
                this.end_time = end_time;
              }
}
