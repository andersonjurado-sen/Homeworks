export interface Person {
  id: string;
  kind: 'person';
  name: string;
  age: number;
}

export interface City {
  id: string;
  kind: 'city';
  name: string;
}

export type GraphNode = Person | City;

export const isPerson = (node: GraphNode): node is Person => node.kind === 'person';
export const isCity = (node: GraphNode): node is City => node.kind === 'city';