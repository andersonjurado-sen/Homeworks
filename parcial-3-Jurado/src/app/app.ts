import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Ranking } from './components/ranking/ranking';
import { Related } from './components/related/related';
import { Search } from './components/search/search';
import { MusicStore } from './services/music-store';

@Component({
  selector: 'app-root',
  imports: [Search, Ranking, Related, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected store = inject(MusicStore);

  protected totalPlays = computed(() =>
    this.store.songs().reduce((sum, song) => sum + song.plays, 0)
  );
}