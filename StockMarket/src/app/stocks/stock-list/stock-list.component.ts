import { Component, Input, OnInit } from '@angular/core';

import { Stock } from '../../models/stock';
import { StockService } from '../../stock.service'
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  //stockService: StockService | undefined;
  
  @Input() stocks: Stock[] = [];
  
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocksByPrice() {
    this.stockService?.getStocksByPrice()
      .subscribe(data => this.stocks = data);
  }

  getStocks() {
    this.stockService.getStocks().subscribe(data =>this.stocks = data);
  }

  getStocksByVolume() {
    this.stockService?.getStocksByVolume()
      .subscribe(data => this.stocks = data);
  }

  getStocksByPriceChange() {
    this.stockService?.getStocksByPriceChange()
      .subscribe(data => this.stocks = data);
  }

}
