import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private router: Router, private bs: BookStoreService) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    // @ts-ignore
    this.bs.getSingle(params.get('isbn')).subscribe((book) => {
      this.book = book;
    });
  }

  getRating(rating?: number): any[] {
    return new Array(rating);
  }

  removeBook(): void {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn).subscribe(res => {
        this.router.navigate(['../'], {relativeTo: this.route})
      })
    }
  }
}
