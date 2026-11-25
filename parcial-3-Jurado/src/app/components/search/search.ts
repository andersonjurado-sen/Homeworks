import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicStore } from '../../services/music-store';

interface Status {
  text: string;
  ok: boolean;
}

@Component({
  selector: 'app-search',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  protected store = inject(MusicStore);

  query = signal('');

  suggestions = computed(() =>
    this.query().trim() ? this.store.suggest(this.query(), 6) : []
  );

  exact = computed(() =>
    this.query().trim() ? this.store.exists(this.query()) : false
  );

  title = '';
  artist = '';
  relateWith = '';
  status = signal<Status | null>(null);

  onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  listen(id: string): void {
    this.store.play(id);
  }

  choose(id: string): void {
    this.store.select(id);
  }

  onAdd(): void {
    try {
      const song = this.store.addSong(this.title, this.artist);

      if (this.relateWith) {
        this.store.relate(song.id, this.relateWith);
      }

      this.status.set({ text: `"${song.title}" agregada.`, ok: true });
      this.title = '';
      this.artist = '';
      this.relateWith = '';
    } catch (e) {
      this.status.set({ text: (e as Error).message, ok: false });
    }
  }
}