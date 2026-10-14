import { NodeData } from '../models/tree-node.model';

export const ROOT_ID = 'root';

export class NaryNode {
  children: NaryNode[] = [];

  constructor(public data: NodeData) {}

  isWritableBy(email: string | null | undefined): boolean {
    if (this.data.type === 'file') return false;
    return this.data.id === ROOT_ID || this.data.createdBy === email;
  }
}


export class NaryTree {
  readonly root = new NaryNode({
    id: ROOT_ID,
    name: 'Raíz',
    type: 'folder',
    parentId: null,
    createdBy: 'system',
    createdAt: 0
  });

  find(id: string): NaryNode | null {
    const search = (node: NaryNode): NaryNode | null => {
      if (node.data.id === id) return node;

      for (const child of node.children) {
        const found = search(child);
        if (found) return found;
      }
      return null;
    };

    return search(this.root);
  }

  add(data: NodeData): void {
    if (!data.parentId) {
      throw new Error('El nodo necesita una carpeta padre.');
    }

    const parent = this.find(data.parentId);

    if (!parent) {
      throw new Error('La carpeta padre no existe.');
    }
    if (parent.data.type === 'file') {
      throw new Error('Un archivo no puede tener hijos.');
    }

    parent.children.push(new NaryNode(data));
  }

  static fromList(list: NodeData[]): NaryTree {
    const tree = new NaryTree();

    [...list]
      .sort((a, b) => a.createdAt - b.createdAt)
      .forEach(item => {
        try {
          tree.add(item);
        } catch (error) {
          console.warn('Nodo omitido:', item.name, error);
        }
      });
    

    return tree;
  }
}