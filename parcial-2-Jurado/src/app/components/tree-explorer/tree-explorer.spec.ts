import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeExplorer } from './tree-explorer';

describe('TreeExplorer', () => {
  let component: TreeExplorer;
  let fixture: ComponentFixture<TreeExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeExplorer],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeExplorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
