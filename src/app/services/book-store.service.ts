import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {BookRaw} from "../model/book-raw";
import {BookFactory} from "../model/book-factory";


@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api4.angular-buch.com/secure';

  constructor(private http: HttpClient) {
  }

  create(book: Book): Observable<any> {
    return this.http.post(
      `${this.api}/book`,
      book,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`)
      .pipe(
        retry(3),
        map(bs => bs.map(b => BookFactory.fromRaw(b))),
        catchError(this.errorHandler)
      );
  }

  getSingle(isbn: string): Observable<Book> {
    // @ts-ignore
    return this.http.get<BookRaw>(`${this.api}/book/${isbn}`)
      .pipe(
        retry(3),
        map(b => BookFactory.fromRaw(b)),
        catchError(this.errorHandler)
      );
  }

  remove(isbn: string): Observable<any> {
    // @ts-ignore
    return this.http.delete<any>(`${this.api}/book/${isbn}`, {responseType: "text"});
  }

  getAllSearch(term: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books/search/${term}`
    ).pipe(
      retry(3),
      map(booksRaw =>
        booksRaw.map(b => BookFactory.fromRaw(b)),
      ),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
