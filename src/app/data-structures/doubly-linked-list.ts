export class DoublyListNode<T> {
  value: T;
  next: DoublyListNode<T> | null = null;
  prev: DoublyListNode<T> | null = null; // La clave de la lista doble

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> {
  private head: DoublyListNode<T> | null = null;
  private current: DoublyListNode<T> | null = null;

  add(value: T): void {
    const newNode = new DoublyListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.current = newNode;
      return;
    }

    let last = this.head;
    while (last.next) {
      last = last.next;
    }

    last.next = newNode;
    newNode.prev = last; // Conectamos el nuevo nodo hacia atrás
  }

  getCurrent(): T | null {
    return this.current ? this.current.value : null;
  }

  next(): T | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.getCurrent();
  }

  prev(): T | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.getCurrent();
  }

  hasNext(): boolean {
    return !!(this.current && this.current.next);
  }

  hasPrev(): boolean {
    return !!(this.current && this.current.prev);
  }
}