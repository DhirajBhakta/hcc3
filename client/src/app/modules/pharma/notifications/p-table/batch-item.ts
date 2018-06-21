export class BatchItem{

  quantity;
  batch_id;
  pharmarecord;
  constructor(batch_id: Number,
              quantity: Number,
              pharmarecord: Number) {
                this.batch_id = batch_id;
                this.quantity = quantity;
                this.pharmarecord = pharmarecord;
              }
}
