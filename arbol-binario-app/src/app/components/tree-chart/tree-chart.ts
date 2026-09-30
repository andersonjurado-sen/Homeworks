import { Component, ElementRef, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { TreeNode } from '../../data-structures/binary-tree';

interface D3TreeData {
  value: number;
  children?: D3TreeData[];
}

@Component({
  selector: 'app-tree-chart',
  imports: [],
  templateUrl: './tree-chart.html',
  styleUrl: './tree-chart.css'
})
export class TreeChart implements OnChanges, AfterViewInit {
  @Input() root: TreeNode<number> | null = null;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.draw();
  }

  ngOnChanges(): void {
    if (this.viewReady) {
      this.draw();
    }
  }

  private convertToD3Format(node: TreeNode<number> | null): D3TreeData | null {
    if (!node) return null;

    const children: D3TreeData[] = [];
    const leftChild = this.convertToD3Format(node.left);
    const rightChild = this.convertToD3Format(node.right);

    if (leftChild) children.push(leftChild);
    if (rightChild) children.push(rightChild);

    return {
      value: node.value,
      children: children.length > 0 ? children : undefined
    };
  }

  private draw(): void {
    const container = this.chartContainer.nativeElement;
    d3.select(container).select('svg').remove();

    if (!this.root) return;

    const data = this.convertToD3Format(this.root);
    if (!data) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g').attr('transform', 'translate(40, 40)');

    const rootHierarchy = d3.hierarchy(data);
    const treeLayout = d3.tree<D3TreeData>().size([width - 80, height - 80]);
    const treeData = treeLayout(rootHierarchy);

    g.selectAll('line')
      .data(treeData.links())
      .enter()
      .append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    const nodes = g.selectAll('g.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodes.append('circle')
      .attr('r', 18)
      .attr('fill', '#2e6f95');

    nodes.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text(d => d.data.value);
  }
}