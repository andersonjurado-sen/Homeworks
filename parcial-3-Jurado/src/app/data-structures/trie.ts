import { Song } from '../models/song';

export class TrieNode {
  children = new Map<string, TrieNode>();
  song: Song | null = null;
}

export class Trie {
  private root = new TrieNode();
  private count = 0;

  static normalize(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  insert(song: Song): void {
    const key = Trie.normalize(song.title).trim();

    if (!key) {
      throw new Error('La canción necesita un título.');
    }

    let node = this.root;

    for (const character of key) {
      let next = node.children.get(character);

      if (!next) {
        next = new TrieNode();
        node.children.set(character, next);
      }
      node = next;
    }

    if (node.song) {
      throw new Error(`La canción "${song.title}" ya existe.`);
    }

    node.song = song;
    this.count++;
  }

  search(title: string): boolean {
    return this.get(title) !== null;
  }

  get(title: string): Song | null {
    const node = this.find(Trie.normalize(title).trim());
    return node?.song ?? null;
  }

  suggest(prefix: string, limit = 8): Song[] {
    const start = this.find(Trie.normalize(prefix).trimStart());
    if (!start) return [];

    const result: Song[] = [];

    const walk = (node: TrieNode): void => {
      if (node.song) {
        result.push(node.song);
      }
      node.children.forEach(child => walk(child));
    };

    walk(start);

    return result
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, limit);
  }

  size(): number {
    return this.count;
  }

  private find(key: string): TrieNode | null {
    let node: TrieNode = this.root;

    for (const character of key) {
      const next = node.children.get(character);
      if (!next) return null;
      node = next;
    }
    return node;
  }
}