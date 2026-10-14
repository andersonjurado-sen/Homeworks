import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NaryTree, ROOT_ID } from '../../data-structures/nary-trees';
import { NodeType } from '../../models/tree-node.model';
import { AuthService } from '../../services/auth';
import { TreeService } from '../../services/tree';
import { TreeItem } from '../tree-item/tree-item';

@Component({
  selector: 'app-tree-explorer',
  imports: [FormsModule, TreeItem],
  templateUrl: './tree-explorer.html',
  styleUrl: './tree-explorer.css'
})
export class TreeExplorer implements OnInit {
  tree = signal<NaryTree>(new NaryTree());
  selectedId = signal<string>(ROOT_ID);
  selectedName = computed(
    () => this.tree().find(this.selectedId())?.data.name ?? 'Raíz'
  );
  userEmail = computed(() => this.auth.currentUser()?.email ?? '');

  name = '';
  type: NodeType = 'folder';

  error = signal<string>('');
  loading = signal<boolean>(true);

  constructor(private treeService: TreeService, private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async onCreate(): Promise<void> {
    this.error.set('');

    try {
      await this.treeService.create(
        this.tree(),
        this.name,
        this.type,
        this.selectedId()
      );
      this.name = '';
      await this.reload();
    } catch (e: any) {
      this.error.set(e?.message ?? 'No se pudo crear.');
    }
  }

  private async reload(): Promise<void> {
    try {
      this.tree.set(await this.treeService.loadTree());
    } catch {
      this.error.set('No se pudo cargar el árbol.');
    } finally {
      this.loading.set(false);
    }
  }
}