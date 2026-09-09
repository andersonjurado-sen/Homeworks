import { Routes } from '@angular/router';
import { SongPlayer } from './pages/song-player/song-player';
import { BrowserComponent } from './pages/browser/browser';

export const routes: Routes = [
  { path: 'songs', component: SongPlayer },
  { path: 'browser', component: BrowserComponent },
  { path: '', redirectTo: 'songs', pathMatch: 'full' }
];