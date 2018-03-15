import { Component, OnInit } from '@angular/core';
import { PharmaService } from '../services/pharma.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  columnDefs;
  rowData;
  
  constructor(private phService: PharmaService) {
    this.columnDefs = [
      { headerName: "Trade-name", field: "drug.trade_name" },
      { headerName: "Generic-name", field: "drug.generic_name" },
      { headerName: "Batch", field: "batch" },
      { headerName: "Quantity Left", field: "quantity" },
      { headerName: "Rack", field: "rack" },
    ];

  }

  ngOnInit() {
    this.phService.getInventory().subscribe((resp) => this.rowData = resp.json());
  }

}
