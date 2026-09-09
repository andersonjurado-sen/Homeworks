import { Injectable } from '@angular/core';
import { LinkedList } from '../data-structures/linked-list';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songList = new LinkedList<Song>();

  constructor() {
    this.songList.add({ title: 'Bohemian Rhapsody', artist: 'Queen' });
    this.songList.add({ title: 'Billie Jean', artist: 'Michael Jackson' });
    this.songList.add({ title: 'Hotel California', artist: 'Eagles' });
    this.songList.add({ title: 'Smells Like Teen Spirit', artist: 'Nirvana' });
    this.songList.add({ title: 'Rolling in the Deep', artist: 'Adele' });
  }

  getList(): LinkedList<Song> {
    return this.songList;
  }
}