import { Injectable, computed, signal } from '@angular/core';
import { Graph } from '../data-structures/graph';
import { MaxHeap } from '../data-structures/max-heap';
import { Trie } from '../data-structures/trie';
import { Song } from '../models/song';

const byPlays = (a: Song, b: Song): number =>
  a.plays - b.plays || b.title.localeCompare(a.title);

@Injectable({
  providedIn: 'root'
})
export class MusicStore {
  private trie = new Trie();
  private graph = new Graph<Song>();
  private counter = 1;
  private version = signal(0);

  readonly songs = computed(() => {
    this.version();
    return [...this.graph.nodes];
  });

  readonly total = computed(() => this.songs().length);
   readonly selectedId = signal<string | null>(null);

  readonly selected = computed(() => {
    this.version();
    const id = this.selectedId();
    return id ? this.graph.searchNode(id) ?? null : null;
  });
  constructor() {
    this.loadMockData();
  }

  addSong(title: string, artist: string, plays = 0): Song {
    const cleanTitle = title.trim().replace(/\s+/g, ' ');
    const cleanArtist = artist.trim();

    if (!cleanTitle) {
      throw new Error('La canción necesita un título.');
    }
    if (!cleanArtist) {
      throw new Error('La canción necesita un artista.');
    }
    if (!Number.isInteger(plays) || plays < 0) {
      throw new Error('Las reproducciones deben ser un entero mayor o igual a 0.');
    }

    const song: Song = {
      id: `song-${this.counter}`,
      title: cleanTitle,
      artist: cleanArtist,
      plays
    };

    this.trie.insert(song);
    this.graph.addNode(song);
    this.counter++;
    this.touch();
    return song;
  }

  relate(id1: string, id2: string): void {
    this.graph.addEdge(id1, id2);
    this.touch();
  }

  play(id: string): void {
    const song = this.graph.searchNode(id);

    if (!song) {
      throw new Error('La canción no existe.');
    }

    song.plays++;
    this.touch();
  }

  exists(title: string): boolean {
    this.version();
    return this.trie.search(title);
  }

  suggest(prefix: string, limit = 8): Song[] {
    this.version();
    return this.trie.suggest(prefix, limit);
  }

  top(k: number): Song[] {
    this.version();
    return new MaxHeap<Song>(byPlays, this.graph.nodes).top(k);
  }

  relatedTo(id: string): Song[] {
    this.version();
    return this.graph.adjacentTo(id).sort(byPlays).reverse();
  }

  songById(id: string): Song | undefined {
    this.version();
    return this.graph.searchNode(id);
  }
  
    select(id: string): void {
    this.selectedId.set(id);
  }

  private touch(): void {
    this.version.update(v => v + 1);
  }

  private loadMockData(): void {
    const blinding = this.addSong('Blinding Lights', 'The Weeknd', 9420);
    const bohemian = this.addSong('Bohemian Rhapsody', 'Queen', 8810);
    const billie = this.addSong('Billie Jean', 'Michael Jackson', 8350);
    const believer = this.addSong('Believer', 'Imagine Dragons', 6120);
    const corazon = this.addSong('Corazón Partío', 'Alejandro Sanz', 4980);
    const shape = this.addSong('Shape of You', 'Ed Sheeran', 9150);
    const someone = this.addSong('Someone Like You', 'Adele', 7240);
    const rolling = this.addSong('Rolling in the Deep', 'Adele', 7690);
    const levitating = this.addSong('Levitating', 'Dua Lipa', 7980);
    const dontStart = this.addSong("Don't Start Now", 'Dua Lipa', 7010);
    const despacito = this.addSong('Despacito', 'Luis Fonsi', 8920);
    const hawai = this.addSong('Hawái', 'Maluma', 6680);
    const tusa = this.addSong('Tusa', 'Karol G', 6340);
    const bichota = this.addSong('Bichota', 'Karol G', 5870);
    const hotel = this.addSong('Hotel California', 'Eagles', 7520);
    const stairway = this.addSong('Stairway to Heaven', 'Led Zeppelin', 7110);
    const smells = this.addSong('Smells Like Teen Spirit', 'Nirvana', 7380);
    const thunder = this.addSong('Thunderstruck', 'AC/DC', 6450);

    this.relate(blinding.id, levitating.id);
    this.relate(blinding.id, dontStart.id);
    this.relate(levitating.id, dontStart.id);
    this.relate(levitating.id, shape.id);
    this.relate(billie.id, levitating.id);
    this.relate(someone.id, rolling.id);
    this.relate(bohemian.id, stairway.id);
    this.relate(bohemian.id, hotel.id);
    this.relate(stairway.id, hotel.id);
    this.relate(believer.id, thunder.id);
    this.relate(believer.id, smells.id);
    this.relate(smells.id, thunder.id);
    this.relate(despacito.id, hawai.id);
    this.relate(despacito.id, tusa.id);
    this.relate(despacito.id, corazon.id);
    this.relate(tusa.id, bichota.id);
    this.relate(hawai.id, tusa.id);
  }
}
