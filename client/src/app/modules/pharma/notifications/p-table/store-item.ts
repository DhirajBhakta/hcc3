export class StoreItem {
  store_id: string;
  quantity: number;
  constructor(store_id: string,
              quantity: number) {
                this.store_id = store_id;
                this.quantity = quantity;
              }
}
export class DrugItem {
  drug_id: string;
  stores: StoreItem[];
  constructor(drug_id: string,
              stores: StoreItem[]) {
                this.drug_id = drug_id;
                this.stores = stores;
              }
}
