import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../model/book";
import {BookStoreService} from "../../../services/book-store.service";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {

  // @ts-ignore
  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
