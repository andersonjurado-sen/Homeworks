import { Component, signal } from '@angular/core';
import { BrowserService } from '../../services/browser';
import { Page } from '../../models/page';

@Component({
  selector: 'app-browser',
  imports: [],
  templateUrl: './browser.html',
  styleUrl: './browser.css'
})
export class BrowserComponent {
  currentPage = signal<Page | null>(null);
  canGoNext = signal<boolean>(false);
  canGoPrev = signal<boolean>(false);

  constructor(private browserService: BrowserService) {
    this.currentPage.set(this.browserService.getHistory().getCurrent());
    this.updateControls();
  }

  goForward(): void {
    this.currentPage.set(this.browserService.getHistory().next());
    this.updateControls();
  }

  goBack(): void {
    this.currentPage.set(this.browserService.getHistory().prev());
    this.updateControls();
  }

  private updateControls(): void {
    this.canGoNext.set(this.browserService.getHistory().hasNext());
    this.canGoPrev.set(this.browserService.getHistory().hasPrev());
  }
}