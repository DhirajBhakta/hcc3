import { Prescription } from './prescription.model';

export class Diagnosis {
    diagnosis: string;
    doctorID: string;
    patientID: string;
    prescriptions: Prescription[];


    constructor(diagnosis: string,
                doctorID: string,
                patientID: string,
                prescriptions: Prescription[]) {}

}
