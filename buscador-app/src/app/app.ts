import { Component, inject } from '@angular/core';
import { ProductForm } from './components/product-form/product-form';
import { TopSearch } from './components/top-search/top-search';
import { ProductSearch } from './services/product-search';

@Component({
  selector: 'app-root',
  imports: [TopSearch, ProductForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected store = inject(ProductSearch);
}