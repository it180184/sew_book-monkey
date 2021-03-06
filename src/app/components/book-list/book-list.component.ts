import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Book} from "../../model/book";
import {BookStoreService} from "../../services/book-store.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  // @ts-ignore
  books: Book[];

  constructor(private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.bs.getAll().subscribe(
      (res) => {
        this.books = res
      });
  }

}
