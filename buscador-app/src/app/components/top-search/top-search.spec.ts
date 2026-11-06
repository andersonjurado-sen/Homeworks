import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSearch } from './top-search';

describe('TopSearch', () => {
  let component: TopSearch;
  let fixture: ComponentFixture<TopSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
