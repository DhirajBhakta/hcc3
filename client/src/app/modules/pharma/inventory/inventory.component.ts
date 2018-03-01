import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  columnDefs;
  rowData;

  constructor() {
        this.columnDefs = [
            {headerName: "Trade-name", field: "tradeName"},
            {headerName: "Generic-name", field: "genericName"},
            {headerName: "Batch", field: "batch"},
            {headerName: "Quantity Left", field: "quantity"},
            {headerName: "Rack", field: "rack"},

        ];

        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ]; }

  ngOnInit() {
  }

}
