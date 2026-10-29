import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphForms } from './graph-forms';

describe('GraphForms', () => {
  let component: GraphForms;
  let fixture: ComponentFixture<GraphForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphForms],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
