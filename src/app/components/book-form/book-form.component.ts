import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BookFactory} from "../../model/book-factory";
import {Book, Thumbnail} from "../../model/book";
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {


  book: Book = BookFactory.empty();
  @Output() submitBook = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      // ⚠️ Unterschied zum Buch: disabled-Status wird jetzt programmatisch gesetzt, nicht per Deklaration im Model
      isbn: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([
        { title: '', url: '' }
      ]),
      published: []
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.bookForm) { return; }
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(
      values.map(t => this.fb.group(t))
    );
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }
  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }
  addThumbnailControl() {
    this.thumbnails.push(
      this.fb.group({ url: '', title: '' })
    );
  }

  submitForm(): void {
    const formValue = this.bookForm.value;
    const authors = formValue.authors
      .filter((author: string) => {
        return author;
      });
    const thumbnails = formValue.thumbnails
      .filter((thumbnail: any) => thumbnail.url);
    const newBook: Book = {
      ...formValue,
      authors,
      thumbnails
    };
    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }
}
