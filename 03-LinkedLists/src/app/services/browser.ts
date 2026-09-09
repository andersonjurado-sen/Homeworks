import { Injectable } from '@angular/core';
import { DoublyLinkedList } from '../data-structures/doubly-linked-list';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private historyList = new DoublyLinkedList<Page>();

  constructor() {
    this.historyList.add({ url: 'https://google.com', title: 'Google' });
    this.historyList.add({ url: 'https://angular.dev', title: 'Angular Docs' });
    this.historyList.add({ url: 'https://github.com', title: 'GitHub' });
    this.historyList.add({ url: 'https://stackoverflow.com', title: 'Stack Overflow' });
  }

  getHistory(): DoublyLinkedList<Page> {
    return this.historyList;
  }
}
