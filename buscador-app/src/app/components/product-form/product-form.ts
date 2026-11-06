import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductSearch } from '../../services/product-search';

interface Status {
  text: string;
  ok: boolean;
}

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  private store = inject(ProductSearch);

  name = '';
  popularity: number | null = null;
  status = signal<Status | null>(null);

  onSubmit(): void {
    try {
      if (this.popularity === null) {
        throw new Error('Escribe la popularidad.');
      }

      const product = this.store.addProduct(this.name, this.popularity);

      this.status.set({
        text: `"${product.name}" guardado con popularidad ${product.popularity}.`,
        ok: true
      });
      this.name = '';
      this.popularity = null;
    } catch (e) {
      this.status.set({ text: (e as Error).message, ok: false });
    }
  }
}