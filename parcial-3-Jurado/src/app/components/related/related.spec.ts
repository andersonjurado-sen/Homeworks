import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Related } from './related';

describe('Related', () => {
  let component: Related;
  let fixture: ComponentFixture<Related>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Related],
    }).compileComponents();

    fixture = TestBed.createComponent(Related);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
