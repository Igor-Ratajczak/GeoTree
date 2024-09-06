import type { HierarchyNode } from 'd3'
import type { Selection } from 'd3-selection'
import type { FamilyNode } from './createTree'

export function addText(
  node: Selection<SVGGElement, HierarchyNode<FamilyNode>, SVGGElement, unknown>,
  name: string,
  x: number,
  y: number
) {
  node
    .append('text')
    .attr('dy', '.35em')
    .attr('x', (d: any) => {
      if (name === 'spouse') return 250
      else if (d.data.spouse === '') return x
      else return 0
    })
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .text((d: any) => {
      if (name === 'name') return d.data.name
      if (name === 'about') return d.data.about
      if (name === 'spouse') return d.data.spouse
    })
    .attr('stroke', 'black')
    .attr('paint-order', 'stroke')
}
