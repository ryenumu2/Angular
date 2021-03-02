import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Output()
  createBook = new EventEmitter<Book>();

  book: Book = new Book('', '', '', -1);
  constructor() { }

  add() {
    console.log(this.book);
    this.createBook.emit(this.book);
    this.book = new Book('','','',-1);
  }

  ngOnInit(): void {
  }

}
