import { Injectable, computed, signal } from '@angular/core';
import { MinHeap } from '../data-structures/min-heap';
import { Trie } from '../data-structures/trie';
import { Product } from '../models/product';

const byPopularity = (a: Product, b: Product): number =>
  a.popularity - b.popularity || b.name.localeCompare(a.name);

@Injectable({
  providedIn: 'root'
})
export class ProductSearch {
  private trie = new Trie();
  private version = signal(0);

  readonly total = computed(() => {
    this.version();
    return this.trie.size();
  });

  constructor() {
    this.loadMockData();
  }

  addProduct(name: string, popularity: number): Product {
    const product = this.trie.insert(name, popularity);
    this.version.update(v => v + 1);
    return product;
  }

  searchTopK(prefix: string, k: number): Product[] {
    this.version();

    if (!Number.isInteger(k) || k < 1) {
      throw new Error('K debe ser un entero mayor o igual a 1.');
    }

    const heap = new MinHeap<Product>(byPopularity);

    for (const product of this.trie.withPrefix(prefix)) {
      heap.push(product);

      if (heap.size() > k) {
        heap.pop();
      }
    }

    const result: Product[] = [];
    while (heap.size() > 0) {
      result.push(heap.pop()!);
    }

    return result.reverse();
  }

  private loadMockData(): void {
    this.addProduct('air max', 90);
    this.addProduct('air force', 95);
    this.addProduct('air jordan', 85);
    this.addProduct('adidas boost', 80);

    this.addProduct('air zoom', 70);
    this.addProduct('air huarache', 60);
    this.addProduct('adidas samba', 88);
    this.addProduct('adidas stan smith', 75);
    this.addProduct('nike dunk', 92);
    this.addProduct('nike blazer', 65);
    this.addProduct('new balance 550', 78);
    this.addProduct('puma suede', 55);
    this.addProduct('converse chuck taylor', 82);
    this.addProduct('vans old skool', 72);
  }
}