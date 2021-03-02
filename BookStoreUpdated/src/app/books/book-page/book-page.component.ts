import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
/*
  books: Book[] = [{
    cover: '',
    bookId: 1,
    title : 'The Lord of the Rings',
    author : 'J R R Tolkien'
  }, {
    cover: '',
    bookId: 2,
    title : 'The Left Hand of Darkness',
    author: 'Ursula K Le Guin'
  }];
*/

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  addBook(book: Book) {
    //this.books.push(book);
    this.bookService.addBook(book).subscribe(() => this.getBooks());
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }
}
