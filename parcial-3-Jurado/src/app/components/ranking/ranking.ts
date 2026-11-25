import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MusicStore } from '../../services/music-store';

@Component({
  selector: 'app-ranking',
  imports: [DecimalPipe],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking {
  protected store = inject(MusicStore);

  readonly options = [5, 10, 15];
  k = signal(5);

  songs = computed(() => this.store.top(this.k()));
  max = computed(() => Math.max(1, ...this.songs().map(s => s.plays)));

  percent(value: number): number {
    return (value / this.max()) * 100;
  }

  onK(event: Event): void {
    this.k.set(Number((event.target as HTMLSelectElement).value));
  }

  listen(id: string): void {
    this.store.play(id);
  }

  choose(id: string): void {
    this.store.select(id);
  }
}