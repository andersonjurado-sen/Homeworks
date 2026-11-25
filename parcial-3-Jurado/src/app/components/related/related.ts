import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicStore } from '../../services/music-store';

interface Status {
  text: string;
  ok: boolean;
}

@Component({
  selector: 'app-related',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './related.html',
  styleUrl: './related.scss'
})
export class Related {
  protected store = inject(MusicStore);

  related = computed(() => {
    const current = this.store.selected();
    return current ? this.store.relatedTo(current.id) : [];
  });

  candidates = computed(() => {
    const current = this.store.selected();
    if (!current) return [];

    const linked = new Set(this.related().map(s => s.id));
    return this.store.songs().filter(s => s.id !== current.id && !linked.has(s.id));
  });

  target = '';
  status = signal<Status | null>(null);

  choose(id: string): void {
    this.store.select(id);
    this.status.set(null);
  }

  onRelate(): void {
    const current = this.store.selected();

    if (!current || !this.target) {
      this.status.set({ text: 'Elige una canción para conectar.', ok: false });
      return;
    }

    try {
      this.store.relate(current.id, this.target);
      this.status.set({ text: 'Canciones conectadas.', ok: true });
      this.target = '';
    } catch (e) {
      this.status.set({ text: (e as Error).message, ok: false });
    }
  }
}