import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stocks: Stock[] = [];
  
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }
}
