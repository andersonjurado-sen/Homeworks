import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [
    { id: 1, name: 'Juan Pérez', phone: '3001234567' },
    { id: 2, name: 'María López', phone: '3109876543' },
    { id: 3, name: 'Carlos Ruiz', phone: '3205551234' }
  ];

  private nextId = 4;

  getContacts(): Observable<Contact[]> {
    return of(this.contacts).pipe(delay(2000));
  }

  addContact(name: string, phone: string): void {
    this.contacts.push({ id: this.nextId, name, phone });
    this.nextId++;
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
}