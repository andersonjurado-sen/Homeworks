export type NodeType = 'folder' | 'file';

export interface NodeData {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  createdBy: string;
  createdAt: number;
}