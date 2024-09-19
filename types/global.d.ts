// types/global.d.ts
import type { HierarchyPointNode } from 'd3-hierarchy'

declare global {
  type UserData = {
    name: string
    text: string
  }
  type SpouseNode = {
    name: string
    birth: number
    death: number | null
    description: string
    userData: UserData[]
  }
  type FamilyNode = {
    id: number
    name: string
    birth: number
    death?: number | null
    description: string
    userData: UserData[]
    spouse: SpouseNode | null
    children?: FamilyNode[]
  }
  type D3HierarchyPointNode<FamilyNode> = HierarchyPointNode<FamilyNode>
}

export {}
