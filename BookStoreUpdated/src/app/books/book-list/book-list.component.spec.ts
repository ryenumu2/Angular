import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table', () => {
    component.books = [{
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
    let fixture = TestBed.createComponent(BookListComponent);
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    //console.log(table);
    expect(table.rows.length).toBe(1);
    expect(table.rows[0].cells[0].textContent).toBe('Title');
  });

  it('should contain a div if there are no books', () => {
    component.books = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    const div = compiled.querySelector('#nobooks');
    expect(div).toBeTruthy();
    expect(table.rows.length).toBe(1);
});
});
