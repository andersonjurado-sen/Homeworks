export class MinHeap<T> {
  private heap: T[] = [];

  constructor(
    private compare: (a: T, b: T) => number,
    initial: T[] = []
  ) {
    this.heap = [...initial];
    this.heapify();
  }

  push(value: T): void {
    this.heap.push(value);
    this.percolateUp();
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;

    this.swap(0, this.heap.length - 1);
    const min = this.heap.pop();
    this.percolateDown(0);

    return min;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  heapify(): void {
    const start = Math.floor((this.heap.length - 2) / 2);

    for (let i = start; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  percolateDown(index: number): void {
    const n = this.heap.length;
    let i = index;

    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < n && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === i) return;

      this.swap(i, smallest);
      i = smallest;
    }
  }

  percolateUp(): void {
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (this.compare(this.heap[i], this.heap[parent]) >= 0) return;

      this.swap(i, parent);
      i = parent;
    }
  }

  swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size(): number {
    return this.heap.length;
  }

  toArray(): T[] {
    return [...this.heap];
  }
}