import { Component, signal } from '@angular/core';
import { SongsService } from '../../services/songs';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-player',
  imports: [],
  templateUrl: './song-player.html',
  styleUrl: './song-player.css'
})
export class SongPlayer {
  currentSong = signal<Song | null>(null);
  canGoNext = signal<boolean>(true);

  constructor(private songsService: SongsService) {
    this.currentSong.set(this.songsService.getList().getCurrent());
    this.updateCanGoNext();
  }

  playNext(): void {
    const song = this.songsService.getList().next();
    this.currentSong.set(song);
    this.updateCanGoNext();
  }

  private updateCanGoNext(): void {
    this.canGoNext.set(this.songsService.getList().hasNext());
  }
}