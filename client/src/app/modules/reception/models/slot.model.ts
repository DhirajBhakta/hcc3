export class Slot {
  id = 0;
  status;
  patient;
  appointment;

  public constructor(status: string,
                     patient: number,
                     appointment: number) {

                      this.status = status;
                      this.patient = patient;
                      this.appointment = appointment;

  }
}
