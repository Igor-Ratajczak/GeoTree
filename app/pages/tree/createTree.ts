import * as d3 from 'd3'
import { addText } from './addText'

export type FamilyNode = {
  name: string
  about: string
  spouse: string
  children?: FamilyNode[] // Use optional chaining here
}
export const createTree = (root: Ref<HTMLDivElement | null>) => {
  const family: FamilyNode = {
    name: 'root',
    about: 'a great family',
    spouse: 'family?',
    children: [
      {
        name: 'child #1',
        about: 'a great family',
        spouse: 'family?',
        children: [
          { name: 'grandchild #1', about: 'a great family', spouse: '' },
          { name: 'grandchild #2', about: 'a great family', spouse: '' },
          { name: 'grandchild #3', about: 'a great family', spouse: '' },
        ],
      },
      {
        name: 'child #2',
        about: 'a great family',
        spouse: 'family?',
        children: [
          { name: 'grandchild #1', about: 'a great family', spouse: '' },
          { name: 'grandchild #2', about: 'a great family', spouse: '' },
          { name: 'grandchild #3', about: 'a great family', spouse: '' },
        ],
      },
    ],
  }

  const nodes = d3.hierarchy(family)
  const width = window.innerWidth
  const height = window.innerHeight
  let i = 0
  const tree = d3.tree().size([height, width]).nodeSize([350, 250])

  const svg = d3
    .select(root.value)
    .append('svg')
    .style('width', width)
    .style('height', height - 130)
    .style('font', '10px sans-serif;')

  const g = svg.append('g')

  const zoom = d3.zoom().on('zoom', (e) => g.attr('transform', e.transform))
  svg.call(zoom as any)
  svg.call(
    zoom.transform as any,
    d3.zoomIdentity.scale(1).translate(width / 2, height / 4)
  )

  tree(nodes as any)

  const node = g
    .selectAll('g.node')
    .data(nodes, (d: any) => d.id || (d.id = ++i))

  // Create the links
  const links = g.append('g')
  links
    .selectAll('.link')
    .data(nodes.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 20)
    .attr(
      'd',
      (d3.linkVertical() as any).x((d: any) => d.x).y((d: any) => d.y)
    )
    .style('opacity', 0)

  const nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .style('opacity', 0)

  // add rect
  nodeEnter
    .append('rect')
    .attr('class', 'rect')
    .attr('style', 'cursor: pointer;')
    .attr('x', (d) => (d.data.spouse !== '' ? 50 : 0))
    .attr('rx', '2em')
    .attr('ry', '50px')
    .attr('width', (d) => (d.data.spouse !== '' ? '30em' : '20em'))
    .attr('height', '8em')
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', '5px')
    .attr('transform', () => `translate(${-150})`)

  // add name
  addText(nodeEnter, 'name', 0, 20)

  // add about
  addText(nodeEnter, 'about', 0, 50)

  // add spouse
  addText(nodeEnter, 'spouse', 100, 20)

  d3.selectAll('rect').on('mouseenter', (event: MouseEvent) => {
    event.target.attributes['fill'].nodeValue = 'lightblue'
  })

  d3.selectAll('text').on('mouseenter', (event: MouseEvent) => {
    event.fromElement.attributes['fill'].nodeValue = 'lightblue'
  })

  d3.selectAll('rect ').on(
    'mouseleave',
    (event: MouseEvent) => (event.target.attributes['fill'].nodeValue = 'white')
  )

  d3.selectAll('g.node').transition().duration(1000).style('opacity', 1)
  d3.selectAll('path.link').transition().duration(1000).style('opacity', 1)
}
