import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeItem } from './tree-item';

describe('TreeItem', () => {
  let component: TreeItem;
  let fixture: ComponentFixture<TreeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
