import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock/stock.component';


@NgModule({
  declarations: [
    StockListComponent,
    StockComponent,
    //StockFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StockComponent
  ]
})
export class StocksModule { }
