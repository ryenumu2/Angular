import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private url = '/BookService/jaxrs/books';

  getBooks(): Observable<Book[]> {
    //return of(this.books);
    return this.http.get<Book[]>(this.url);
  }

  addBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    return this.http.post<Book>(this.url, book, { headers: headers });
}
}
