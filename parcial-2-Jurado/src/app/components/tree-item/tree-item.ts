import { Component, input, output } from '@angular/core';
import { NaryNode } from '../../data-structures/nary-trees';

@Component({
  selector: 'app-tree-item',
  imports: [],
  templateUrl: './tree-item.html',
  styleUrl: './tree-item.css'
})
export class TreeItem {
  node = input.required<NaryNode>();
  selectedId = input<string>('');
  userEmail = input<string>('');
  selected = output<string>();

  canSelect(): boolean {
    return this.node().isWritableBy(this.userEmail());
  }

  isLockedFolder(): boolean {
    return this.node().data.type === 'folder' && !this.canSelect();
  }

  onClick(): void {
    if (this.canSelect()) {
      this.selected.emit(this.node().data.id);
    }
  }
}