import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap, tap} from "rxjs";
import {BookStoreService} from "../../services/book-store.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  foundBooks: Book[] = [];
  isLoading = false;
  keyUp$: Subject<string> = new Subject<string>();

  constructor(private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.keyUp$.pipe(
      filter(t => t.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(term => {
        return this.bs.getAllSearch(term);
      }),
      tap(() => {
        this.isLoading = false;
      })
    ).subscribe(books => this.foundBooks = books);
  }

}
