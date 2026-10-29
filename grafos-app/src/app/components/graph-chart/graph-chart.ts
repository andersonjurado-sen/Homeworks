import { Component, ElementRef, OnDestroy, effect, inject, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { GraphNode, isPerson } from '../../models/graph-node';
import { GraphStore } from '../../services/graph-store';

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  kind: 'person' | 'city';
  label: string;
  detail: string;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  type: 'lives' | 'friend';
}

const WIDTH = 760;
const HEIGHT = 480;
const LABEL_SPACE = 18;

const radiusOf = (n: SimNode): number => (n.kind === 'city' ? 22 : 12);

@Component({
  selector: 'app-graph-chart',
  imports: [],
  templateUrl: './graph-chart.html',
  styleUrl: './graph-chart.css'
})
export class GraphChart implements OnDestroy {
  private store = inject(GraphStore);
  private container = viewChild<ElementRef<HTMLDivElement>>('container');
  private simulation?: d3.Simulation<SimNode, undefined>;

  constructor() {
    effect(() => {
      const nodes = this.store.nodes();
      const edges = this.store.edges();
      const host = this.container()?.nativeElement;

      if (host) {
        this.draw(host, nodes, edges);
      }
    });
  }

  ngOnDestroy(): void {
    this.simulation?.stop();
  }

  private draw(host: HTMLDivElement, nodes: GraphNode[], edges: [string, string][]): void {
    this.simulation?.stop();
    d3.select(host).selectAll('*').remove();

    const simNodes = nodes.map((n): SimNode => ({
      id: n.id,
      kind: n.kind,
      label: n.name,
      detail: isPerson(n) ? `${n.name}, ${n.age} años` : `Ciudad: ${n.name}`
    }));

    const isCityId = (id: string) => nodes.some(n => n.id === id && n.kind === 'city');

    const simLinks = edges.map(([a, b]): SimLink => ({
      source: a,
      target: b,
      type: isCityId(a) || isCityId(b) ? 'lives' : 'friend'
    }));

    const svg = d3
      .select(host)
      .append('svg')
      .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
      .attr('width', '100%');

    const link = svg
      .append('g')
      .selectAll<SVGLineElement, SimLink>('line')
      .data(simLinks)
      .join('line')
      .attr('stroke', d => (d.type === 'lives' ? '#9bb4c8' : '#e08a3c'))
      .attr('stroke-width', d => (d.type === 'lives' ? 1.5 : 2.5))
      .attr('stroke-dasharray', d => (d.type === 'lives' ? '4 3' : null));

    const node = svg
      .append('g')
      .selectAll<SVGGElement, SimNode>('g')
      .data(simNodes)
      .join('g');

    node
      .append('circle')
      .attr('r', radiusOf)
      .attr('fill', d => (d.kind === 'city' ? '#2e6f95' : '#6bbf8a'))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    node
      .append('text')
      .attr('dy', d => radiusOf(d) + 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', d => (d.kind === 'city' ? '13px' : '11px'))
      .attr('font-weight', d => (d.kind === 'city' ? '600' : '400'))
      .attr('fill', '#1a2b3c')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3)
      .attr('paint-order', 'stroke')
      .text(d => d.label);

    node.append('title').text(d => d.detail);

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id(d => d.id)
          .distance(l => (l.type === 'lives' ? 70 : 120))
      )
      .force('charge', d3.forceManyBody().strength(-260))
      .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', d3.forceCollide<SimNode>().radius(d => radiusOf(d) + 8));

    simulation.on('tick', () => {
      simNodes.forEach(n => {
        const r = radiusOf(n);
        n.x = Math.max(r, Math.min(WIDTH - r, n.x ?? WIDTH / 2));
        n.y = Math.max(r, Math.min(HEIGHT - r - LABEL_SPACE, n.y ?? HEIGHT / 2));
      });

      link
        .attr('x1', d => (d.source as SimNode).x ?? 0)
        .attr('y1', d => (d.source as SimNode).y ?? 0)
        .attr('x2', d => (d.target as SimNode).x ?? 0)
        .attr('y2', d => (d.target as SimNode).y ?? 0);

      node.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    node.call(
      d3
        .drag<SVGGElement, SimNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

    this.simulation = simulation;
  }
}