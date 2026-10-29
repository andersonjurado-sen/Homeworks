export class Graph<T extends { id: string }> {
  nodes: T[] = [];
  adjList: Record<string, string[]> = {};

  addNode(node: T): boolean {
    if (this.searchNode(node.id)) return false;

    this.nodes.push(node);
    this.adjList[node.id] = [];
    return true;
  }

  searchNode(id: string): T | undefined {
    return this.nodes.find(n => n.id === id);
  }

  addEdge(id1: string, id2: string): void {
    if (id1 === id2) {
      throw new Error('Un nodo no puede conectarse consigo mismo.');
    }
    if (!this.searchNode(id1) || !this.searchNode(id2)) {
      throw new Error('Los dos nodos deben existir en el grafo.');
    }
    if (this.adjList[id1].includes(id2)) return;

    this.adjList[id1].push(id2);
    this.adjList[id2].push(id1);
  }

  adjacentTo(id: string): T[] {
    return (this.adjList[id] ?? [])
      .map(neighborId => this.searchNode(neighborId))
      .filter((n): n is T => n !== undefined);
  }

  getEdges(): [string, string][] {
    const edges: [string, string][] = [];

    for (const node of this.nodes) {
      for (const neighborId of this.adjList[node.id]) {
        if (node.id < neighborId) {
          edges.push([node.id, neighborId]);
        }
      }
    }
    return edges;
  }

  removeNode(id: string): boolean {
    if (!this.searchNode(id)) return false;

    this.nodes = this.nodes.filter(n => n.id !== id);
    delete this.adjList[id];

    for (const key of Object.keys(this.adjList)) {
      this.adjList[key] = this.adjList[key].filter(neighborId => neighborId !== id);
    }
    return true;
  }

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  printAdjacency(id: string): void {
    if (this.searchNode(id)) {
      console.log(id, '->', this.adjList[id]);
    }
  }

  print(): void {
    console.log(this.adjList);
  }
}