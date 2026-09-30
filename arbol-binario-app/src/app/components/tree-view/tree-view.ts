import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BinaryTree } from '../../data-structures/binary-tree';
import { TreeChart } from '../tree-chart/tree-chart';

@Component({
  selector: 'app-tree-view',
  imports: [FormsModule, TreeChart],
  templateUrl: './tree-view.html',
  styleUrl: './tree-view.css'
})
export class TreeView implements OnInit {
  tree = new BinaryTree<number>();

  preOrderResult = signal<number[]>([]);
  inOrderResult = signal<number[]>([]);
  postOrderResult = signal<number[]>([]);

  searchValue: number | null = null;
  searchResult = signal<string>('');

  ngOnInit(): void {
    const numbers = [50, 30, 70, 20, 40, 60, 80, 10, 25];
    numbers.forEach(n => this.tree.insert(n));

    this.updateTraversals();

    console.log('PreOrder:', this.tree.preOrder());
    console.log('InOrder:', this.tree.inOrder());
    console.log('PostOrder:', this.tree.postOrder());
  }

  private updateTraversals(): void {
    this.preOrderResult.set(this.tree.preOrder());
    this.inOrderResult.set(this.tree.inOrder());
    this.postOrderResult.set(this.tree.postOrder());
  }

  buscar(): void {
    if (this.searchValue === null) return;

    const existe = this.tree.contains(this.searchValue);
    this.searchResult.set(
      existe
        ? `El valor ${this.searchValue} SÍ está en el árbol.`
        : `El valor ${this.searchValue} NO está en el árbol.`
    );
  }
}