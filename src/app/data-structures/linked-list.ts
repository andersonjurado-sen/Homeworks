export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private current: ListNode<T> | null = null;

  add(value: T): void {
    const newNode = new ListNode(value);

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

  reset(): void {
    this.current = this.head;
  }

  hasNext(): boolean {
    return !!(this.current && this.current.next);
  }
}