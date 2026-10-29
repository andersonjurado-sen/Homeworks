import { Injectable, computed, signal } from '@angular/core';
import { Graph } from '../data-structures/graph';
import { City, GraphNode, Person, isCity, isPerson } from '../models/graph-node';

@Injectable({
  providedIn: 'root'
})
export class GraphStore {
  private graph = new Graph<GraphNode>();
  private counter = 1;
  private version = signal(0);

  readonly cities = computed(() => {
    this.version();
    return this.graph.nodes.filter(isCity);
  });

  readonly people = computed(() => {
    this.version();
    return this.graph.nodes.filter(isPerson);
  });

  readonly nodes = computed(() => {
    this.version();
    return [...this.graph.nodes];
  });

  readonly edges = computed(() => {
    this.version();
    return this.graph.getEdges();
  });

  constructor() {
    this.loadMockData();
  }

  addCity(name: string): City {
    const clean = name.trim();
    if (!clean) {
      throw new Error('La ciudad necesita un nombre.');
    }

    const exists = this.graph.nodes.some(
      n => isCity(n) && n.name.toLowerCase() === clean.toLowerCase()
    );
    if (exists) {
      throw new Error(`La ciudad "${clean}" ya existe.`);
    }

    const city: City = { id: this.newId('city'), kind: 'city', name: clean };
    this.graph.addNode(city);
    this.touch();
    return city;
  }

  addPerson(name: string, age: number, cityId: string): Person {
    const clean = name.trim();
    if (!clean) {
      throw new Error('La persona necesita un nombre.');
    }
    if (!Number.isInteger(age) || age < 0 || age > 120) {
      throw new Error('La edad debe ser un número entero entre 0 y 120.');
    }

    const city = this.graph.searchNode(cityId);
    if (!city || !isCity(city)) {
      throw new Error('Debes elegir una ciudad que exista.');
    }

    const person: Person = { id: this.newId('person'), kind: 'person', name: clean, age };
    this.graph.addNode(person);
    this.graph.addEdge(person.id, city.id);
    this.touch();
    return person;
  }

  addFriendship(id1: string, id2: string): void {
    const a = this.graph.searchNode(id1);
    const b = this.graph.searchNode(id2);

    if (!a || !b || !isPerson(a) || !isPerson(b)) {
      throw new Error('Una amistad solo puede unir a dos personas.');
    }

    this.graph.addEdge(id1, id2);
    this.touch();
  }

  peopleIn(cityId: string): Person[] {
    this.version();
    return this.graph.adjacentTo(cityId).filter(isPerson);
  }

  cityOf(personId: string): City | undefined {
    this.version();
    return this.graph.adjacentTo(personId).find(isCity);
  }

  friendsOf(personId: string): Person[] {
    this.version();
    return this.graph.adjacentTo(personId).filter(isPerson);
  }

  private newId(prefix: string): string {
    return `${prefix}-${this.counter++}`;
  }

  private touch(): void {
    this.version.update(v => v + 1);
  }

  private loadMockData(): void {
    const cali = this.addCity('Cali');
    const bogota = this.addCity('Bogotá');
    const medellin = this.addCity('Medellín');

    const ana = this.addPerson('Ana', 22, cali.id);
    const luis = this.addPerson('Luis', 25, cali.id);
    const maria = this.addPerson('María', 30, bogota.id);
    const carlos = this.addPerson('Carlos', 28, medellin.id);
    const sofia = this.addPerson('Sofía', 24, bogota.id);
    const juan = this.addPerson('Juan', 35, cali.id);

    this.addFriendship(ana.id, luis.id);
    this.addFriendship(ana.id, maria.id);
    this.addFriendship(luis.id, carlos.id);
    this.addFriendship(maria.id, sofia.id);
    this.addFriendship(carlos.id, juan.id);
    this.addFriendship(sofia.id, juan.id);
  }
}