import { Product } from '../models/product';

export class TrieNode {
  children = new Map<string, TrieNode>();
  product: Product | null = null;

  get isEndOfWord(): boolean {
    return this.product !== null;
  }
}

export class Trie {
  readonly root = new TrieNode();
  private count = 0;

  insert(name: string, popularity: number): Product {
    const displayName = Trie.clean(name).trim();
    const key = displayName.toLowerCase();

    if (!key) {
      throw new Error('El producto necesita un nombre.');
    }
    if (!Number.isFinite(popularity) || popularity < 0) {
      throw new Error('La popularidad debe ser un número mayor o igual a 0.');
    }

    let current = this.root;

    for (const character of key) {
      let next = current.children.get(character);

      if (!next) {
        next = new TrieNode();
        current.children.set(character, next);
      }
      current = next;
    }

    if (!current.isEndOfWord) {
      this.count++;
    }

    const product: Product = { name: displayName, popularity };
    current.product = product;
    return product;
  }

  search(name: string): boolean {
    const node = this.findNode(Trie.clean(name).trim().toLowerCase());
    return node?.isEndOfWord ?? false;
  }

  withPrefix(prefix: string): Product[] {
    const start = this.findNode(Trie.clean(prefix).trimStart().toLowerCase());
    if (!start) return [];

    const result: Product[] = [];

    const collect = (node: TrieNode): void => {
      if (node.product) {
        result.push(node.product);
      }
      node.children.forEach(child => collect(child));
    };

    collect(start);
    return result;
  }

  size(): number {
    return this.count;
  }

  private findNode(key: string): TrieNode | null {
    let current: TrieNode = this.root;

    for (const character of key) {
      const next = current.children.get(character);
      if (!next) return null;
      current = next;
    }
    return current;
  }

  private static clean(text: string): string {
    return text.replace(/\s+/g, ' ');
  }
}