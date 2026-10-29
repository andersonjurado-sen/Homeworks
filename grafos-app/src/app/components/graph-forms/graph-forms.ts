import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphStore } from '../../services/graph-store';

interface Status {
  text: string;
  ok: boolean;
}

@Component({
  selector: 'app-graph-forms',
  imports: [FormsModule],
  templateUrl: './graph-forms.html',
  styleUrl: './graph-forms.css'
})
export class GraphForms {
  protected store = inject(GraphStore);

  status = signal<Status | null>(null);

  cityName = '';

  personName = '';
  personAge: number | null = null;
  personCityId = '';

  friendA = '';
  friendB = '';

  onAddCity(): void {
    this.run(() => {
      const city = this.store.addCity(this.cityName);
      this.cityName = '';
      return `Ciudad "${city.name}" agregada.`;
    });
  }

  onAddPerson(): void {
    this.run(() => {
      if (this.personAge === null) {
        throw new Error('Escribe la edad.');
      }

      const person = this.store.addPerson(
        this.personName,
        this.personAge,
        this.personCityId
      );

      this.personName = '';
      this.personAge = null;
      this.personCityId = '';
      return `${person.name} fue agregado(a).`;
    });
  }

  onAddFriendship(): void {
    this.run(() => {
      if (!this.friendA || !this.friendB) {
        throw new Error('Elige a las dos personas.');
      }
      if (this.friendA === this.friendB) {
        throw new Error('Elige dos personas distintas.');
      }

      const alreadyFriends = this.store
        .friendsOf(this.friendA)
        .some(f => f.id === this.friendB);
      if (alreadyFriends) {
        throw new Error('Ya son amigos.');
      }

      this.store.addFriendship(this.friendA, this.friendB);
      this.friendA = '';
      this.friendB = '';
      return 'Amistad creada.';
    });
  }

  private run(action: () => string): void {
    try {
      this.status.set({ text: action(), ok: true });
    } catch (e) {
      this.status.set({ text: (e as Error).message, ok: false });
    }
  }
}