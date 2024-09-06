// types/global.d.ts
import type { HierarchyPointNode } from 'd3-hierarchy'

declare global {
  type D3HierarchyPointNode<T extends Event> = HierarchyPointNode
}

export {}
