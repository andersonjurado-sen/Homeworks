import { Component, computed, inject, signal } from '@angular/core';
import { ProductSearch } from '../../services/product-search';

@Component({
  selector: 'app-top-search',
  imports: [],
  templateUrl: './top-search.html',
  styleUrl: './top-search.css'
})
export class TopSearch {
  private store = inject(ProductSearch);

  readonly options = [1, 3, 5, 10];
  readonly total = this.store.total;

  prefix = signal('');
  k = signal(3);

  results = computed(() => this.store.searchTopK(this.prefix(), this.k()));

  maxPopularity = computed(() =>
    Math.max(1, ...this.results().map(p => p.popularity))
  );

  percent(value: number): number {
    return (value / this.maxPopularity()) * 100;
  }

  onPrefix(event: Event): void {
    this.prefix.set((event.target as HTMLInputElement).value);
  }

  onK(event: Event): void {
    this.k.set(Number((event.target as HTMLSelectElement).value));
  }
}