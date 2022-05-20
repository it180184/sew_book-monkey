import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookStoreService} from "../../services/book-store.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  // @ts-ignore
  book: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    // @ts-ignore
    this.book = this.bs.getSingle(params.get('isbn'));
  }

  getRating(rating: number | undefined): any[] {
    return new Array(rating);
  }
}
