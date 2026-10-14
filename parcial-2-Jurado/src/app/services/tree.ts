import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { NaryTree } from '../data-structures/nary-trees';
import { NodeData, NodeType } from '../models/tree-node.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private readonly nodes = collection(db, 'nodes');

  constructor(private auth: AuthService) {}

  async loadTree(): Promise<NaryTree> {
    const snapshot = await getDocs(this.nodes);

    const list = snapshot.docs.map(d => ({
      ...(d.data() as Omit<NodeData, 'id'>),
      id: d.id
    }));

    return NaryTree.fromList(list);
  }

  async create(
    tree: NaryTree,
    name: string,
    type: NodeType,
    parentId: string
  ): Promise<void> {
    const user = this.auth.currentUser();
    if (!user?.email) {
      throw new Error('Debes iniciar sesión para crear carpetas o archivos.');
    }

    const cleanName = name.trim();
    if (!cleanName) {
      throw new Error('El nombre no puede estar vacío.');
    }

    const parent = tree.find(parentId);
    if (!parent) {
      throw new Error('La carpeta padre no existe.');
    }
    if (parent.data.type === 'file') {
      throw new Error('Un archivo no puede tener hijos.');
    }

    
    await addDoc(this.nodes, {
      name: cleanName,
      type,
      parentId,
      createdBy: user.email,
      createdAt: Date.now()
    });
  }
}