import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.scss']
})
export class FormMessagesComponent implements OnInit {

  @Input() control?: AbstractControl | null;
  @Input() controlName?: string;

  private allMessages: { [key: string]: { [key: string]: string } } = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden.'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden.',
      minlength: 'Die ISBN muss mindestens 10 Zeichen haben.',
      maxlength: 'Die ISBN darf höchstens 13 Zeichen haben.'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden.'
    },
    authors: {
      required: 'Es muss ein Autor angegeben werden.'
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  errorsForControl(): string[] {
    // @ts-ignore
    const messages: string[] = this.allMessages[this.controlName];
    if (
      !this.control ||
      !this.control.errors ||
      !messages ||
      !this.control.dirty
    ) {
      return [];
    }
    return Object.keys(this.control.errors)
      .map(err => {
        // @ts-ignore
        return messages[err];
      });
  }

}
