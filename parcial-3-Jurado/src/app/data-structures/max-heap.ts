export class MaxHeap<T> {
  private heap: T[];

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
    const max = this.heap.pop();
    this.percolateDown(0);

    return max;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  top(k: number): T[] {
    const copy = new MaxHeap<T>(this.compare, this.heap);
    const result: T[] = [];

    while (result.length < k && copy.size() > 0) {
      result.push(copy.pop()!);
    }
    return result;
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
      let largest = i;

      if (left < n && this.compare(this.heap[left], this.heap[largest]) > 0) {
        largest = left;
      }
      if (right < n && this.compare(this.heap[right], this.heap[largest]) > 0) {
        largest = right;
      }

      if (largest === i) return;

      this.swap(i, largest);
      i = largest;
    }
  }

  percolateUp(): void {
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (this.compare(this.heap[i], this.heap[parent]) <= 0) return;

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