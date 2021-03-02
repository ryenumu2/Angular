import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StockComponent } from './stocks/stock/stock.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksModule } from './stocks/stocks.module';

@NgModule({
  declarations: [
    AppComponent,
    //StockComponent,
    //StockListComponent,
    //StockFormComponent
  ],
  imports: [
    BrowserModule,
    StocksModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
