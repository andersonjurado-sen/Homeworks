import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  name = '';
  phone = '';

  add = output<{ name: string; phone: string }>();

  onSubmit(): void {
    if (this.name.trim() === '' || this.phone.trim() === '') {
      return;
    }

    this.add.emit({ name: this.name, phone: this.phone });

    this.name = '';
    this.phone = '';
  }
}