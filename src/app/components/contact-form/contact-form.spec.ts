import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  nombre = '';
  telefono = '';

  add = output<{ nombre: string; telefono: string }>();

  onSubmit(): void {
    if (this.nombre.trim() === '' || this.telefono.trim() === '') {
      return;
    }

    this.add.emit({ nombre: this.nombre, telefono: this.telefono });

    this.nombre = '';
    this.telefono = '';
  }
}