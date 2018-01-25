export class Prescription {
    drugname: string;
    quantity: string;
    schedule: string;
    comments: string;
    constructor(drugname: string = '',
                quantity: string = '',
                schedule: string = '',
                comments: string = '') {
                    this.drugname = drugname;
                    this.quantity = quantity;
                    this.schedule = schedule;
                    this.comments = comments;
                }
}
