import { Component, OnInit, signal } from '@angular/core';
import { Contact } from './models/contact';
import { ContactsService } from './services/contacts';
import { Loader } from './components/loader/loader';
import { ContactList } from './components/contact-list/contact-list';
import { ContactForm } from './components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [Loader, ContactList, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  contacts = signal<Contact[]>([]);
  loading = signal<boolean>(true);

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts.set(data);
      this.loading.set(false);
    });
  }

  onAdd(newContact: { name: string; phone: string }): void {
    this.contactsService.addContact(newContact.name, newContact.phone);
    this.contacts.update(list => [
      ...list,
      { id: Date.now(), name: newContact.name, phone: newContact.phone }
    ]);
  }

  onDelete(id: number): void {
    this.contactsService.deleteContact(id);
    this.contacts.update(list => list.filter(c => c.id !== id));
  }
}