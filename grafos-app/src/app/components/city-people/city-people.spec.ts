import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityPeople } from './city-people';

describe('CityPeople', () => {
  let component: CityPeople;
  let fixture: ComponentFixture<CityPeople>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityPeople],
    }).compileComponents();

    fixture = TestBed.createComponent(CityPeople);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
