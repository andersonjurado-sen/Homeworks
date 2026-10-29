import { Component, computed, inject, signal } from '@angular/core';
import { GraphStore } from '../../services/graph-store';

@Component({
  selector: 'app-city-people',
  imports: [],
  templateUrl: './city-people.html',
  styleUrl: './city-people.css'
})
export class CityPeople {
  protected store = inject(GraphStore);

  selectedCityId = signal('');

  selectedCity = computed(() =>
    this.store.cities().find(c => c.id === this.selectedCityId())
  );

  residents = computed(() => {
    const city = this.selectedCity();
    return city ? this.store.peopleIn(city.id) : [];
  });

  onSelect(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.selectedCityId.set(id);

    const city = this.selectedCity();
    if (city) {
      console.log(
        `Personas que viven en ${city.name}:`,
        this.residents().map(p => `${p.name} (${p.age})`)
      );
    }
  }
}