export class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

export class DoubleNode<T> {
  constructor(
    public value: T,
    public next: DoubleNode<T> | null = null,
    public prev: DoubleNode<T> | null = null
  ) {}
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  enqueue(val: T): void {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }
  dequeue(): T | null {
    if (!this.head) return null;
    const val = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return val;
  }

  toArray(): T[] {
    const res: T[] = [];
    let curr = this.head;
    while (curr) { res.push(curr.value); curr = curr.next; }
    return res;
  }
}

export class DoublyLinkedList<T> {
  head: DoubleNode<T> | null = null;

  add(val: T): void {
    const newNode = new DoubleNode(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = newNode;
      newNode.prev = curr;
    }
  }

  toArray(): T[] {
    const res: T[] = [];
    let curr = this.head;
    while (curr) { res.push(curr.value); curr = curr.next; }
    return res;
  }
}

export class CircularLinkedList<T> {
  head: Node<T> | null = null;
  current: Node<T> | null = null;

  add(val: T): void {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
      this.current = this.head;
    } else {
      let temp = this.head;
      while (temp.next !== this.head) temp = temp.next!;
      temp.next = newNode;
      newNode.next = this.head;
    }
  }

  rotate(): T | null {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current ? this.current.value : null;
  }

  toArray(): T[] {
    if (!this.head) return [];
    const res: T[] = [];
    let temp = this.head;
    do {
      res.push(temp.value);
      temp = temp.next!;
    } while (temp !== this.head);
    return res;
  }
}

export class DoublyCircularLinkedList<T> {
  head: DoubleNode<T> | null = null;
  current: DoubleNode<T> | null = null;

  add(val: T): void {
    const newNode = new DoubleNode(val);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
      this.current = newNode;
    } else {
      const tail = this.head.prev!;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
  }

  next(): T | null {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current ? this.current.value : null;
  }

  prev(): T | null {
    if (!this.current) return null;
    this.current = this.current.prev;
    return this.current ? this.current.value : null;
  }

  getCurrent(): T | null {
    return this.current ? this.current.value : null;
  }

  toArray(): T[] {
    if (!this.head) return [];
    const res: T[] = [];
    let temp = this.head;
    do {
      res.push(temp.value);
      temp = temp.next!;
    } while (temp !== this.head);
    return res;
  }
}