import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import { BookPageComponent } from './books/book-page/book-page.component';
//import { BookListComponent } from './books/book-list/book-list.component';
import { BooksModule } from './books/books.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    //BookPageComponent,
    //BookListComponent
  ],
  imports: [
    BrowserModule,
    BooksModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
