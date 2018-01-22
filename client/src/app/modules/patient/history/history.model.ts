import { Prescription } from '../../../models/prescription.model';

export class History {
    diagnosis: string;
    date: Date;
    name: string;
    prescriptionList: Prescription[];

    constructor( diagnosis: string,
                date: Date,
                name: string,
                prescriptionList: Prescription[] ) {
        this.diagnosis = diagnosis;
        this.date = date;
        this.name = name;
        this.prescriptionList = prescriptionList;
    }
}
