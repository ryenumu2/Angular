import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Stock } from './models/stock';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/StockService/jaxrs/stocks';

  getStocks(): Observable<Stock[]> {
    //return of(this.books);
    return this.http.get<Stock[]>(this.url);
  }

  addStock(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    return this.http.post<Stock>(this.url, stock, { headers: headers });
}

getStocksByPrice(): Observable<Stock[]> {
  return this.http.get<Stock[]>(this.url, {
      params: {
          filter: 'price'
      }
  }).pipe(catchError(this.handleError));
}

getStocksByVolume(): Observable<Stock[]> {
  return this.http.get<Stock[]>(this.url, {
      params: {
          filter: 'volume'
      }
  }).pipe(catchError(this.handleError));
}

getStocksByPriceChange(): Observable<Stock[]> {
  return this.http.get<Stock[]>(this.url, {
      params: {
          filter: 'priceChange'
      }
  }).pipe(catchError(this.handleError));
}

handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it.
      console.error('An error occurred:', error.error.message);
  } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues 
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Unable to contact service; please try again later.');
};

}