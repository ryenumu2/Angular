import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/models/book';
import { BookFormComponent } from '../book-form/book-form.component';

import { BookPageComponent } from './book-page.component';

@Component({
  selector: 'app-book-list',
  template: 'mock book list'
})
class BookListMockComponent { 
  @Input()
  books: Book[] = [];
};

//class MockBookFormComponent {
//};





@Component({
  selector: 'app-book-form',
  template: 'mock book form'
})
class MockBookFormComponent {
  book?: Book;

  @Output()
  createBook = new EventEmitter<Book>();

  add() {
      this.createBook.emit(this.book);
  }
}

describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;
 // let addBookSpy: any;
  let addBookSpy: any;

  beforeEach(async () => {
    
    const testBooks: Book[] = [{
      title: 'The Hobbit',
      author: 'J R R Tolkien',
      cover: '',
      bookId: 1
  }, {
      title: 'A Wizard of Earthsea',
      author: 'Ursula K Le Guin',
      cover: '',
      bookId: 2
  }];

    const bookService = jasmine.createSpyObj('BookService',['getBooks']);
    bookService.getBooks.and.returnValue(of(testBooks));

    addBookSpy = bookService.addBook.and.callFake(function (param: Book) {
      return of(param);
    });
    await TestBed.configureTestingModule({
      declarations: [ 
        BookPageComponent,
        BookListMockComponent,
        //MockBookFormComponent
        //BookFormMockComponent
       ],
       providers: [
        {provide: BookService, useValue: bookService}
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass books to the child component', () => {
    const bookList = fixture.debugElement.query(
      By.css('app-book-list')).componentInstance;
    expect(bookList.books.length).toBe(2);
  });

  it('should call the service to add a book', () => {
    const expected = new Book('The Lathe of Heaven', 'Ursula K Le Guin', '', 3);
    component.addBook(expected);
    expect(addBookSpy).toHaveBeenCalledWith(expected);
});

it('should respond to the output event from the book form', () => {
  const expected = new Book('The Silmarillion', 'J R R Tolkien', '', 3);
  // Get the mock book form component
  const bookForm = fixture.debugElement.query(By.css('app-book-form')).componentInstance;
  // Set the book
  bookForm.book = expected;
  // Trigger the output event
  bookForm.add();
  // Now check the method was called
  expect(addBookSpy).toHaveBeenCalledWith(expected);
});

/*
  it('should add a book to the array', () => {
    const oldLength = component.books.length;
    component.addBook(new Book('The Lathe of Heaven', 'Ursula K Le Guin', '', 3));
    expect(component.books.length).toBe(oldLength + 1);
    expect(component.books[oldLength].title).toBe('The Lathe of Heaven');
  });
*/
  it('should retrieve books from the service', () => {
    expect(component.books.length).toBe(2);
    expect(component.books[0].title).toBe('The Hobbit');
    expect(component.books[1].title).toBe('A Wizard of Earthsea');
  });
});
