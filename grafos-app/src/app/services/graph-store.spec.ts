import { TestBed } from '@angular/core/testing';
import { GraphStore } from './graph-store';

describe('GraphStore', () => {
  let service: GraphStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
