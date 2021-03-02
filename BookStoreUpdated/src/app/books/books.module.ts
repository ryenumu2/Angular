import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookListComponent,
    BookPageComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookPageComponent
  ]
})
export class BooksModule { }
