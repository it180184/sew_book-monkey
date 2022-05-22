import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BookStoreService} from "../../services/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(private bs: BookStoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createBook(book: Book) {
    this.bs.create(book).subscribe(() => {
      this.router.navigate(['/books']);
    })
  }
}
