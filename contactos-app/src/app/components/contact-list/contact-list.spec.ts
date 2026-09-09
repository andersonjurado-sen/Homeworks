import { Component, input, output } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  contacts = input.required<Contact[]>();
  delete = output<number>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
