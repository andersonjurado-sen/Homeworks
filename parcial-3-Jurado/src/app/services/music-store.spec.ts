import { TestBed } from '@angular/core/testing';
import { MusicStore } from './music-store';

describe('MusicStore', () => {
  let service: MusicStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
