// types/global.d.ts
import type { HierarchyNode } from 'd3-hierarchy'

declare global {
  interface UserData {
    name: string
    text: string
  }
  interface SpouseNode {
    name: string
    birth: string | null
    death: string | null
    description: string
    userData: UserData[]
  }

  interface Icon {
    id: string
    person: string
    spouse: string
  }
  interface SpouseForm extends SpouseNode {
    icon: string
  }
  interface PersonForm {
    icon: string
    name: string
    birth: string | null
    death: string | null
    description: string
    userData: UserData[]
    hasSpouse: boolean
    spouse: SpouseForm | null
  }

  interface FamilyNode {
    id: string
    icon: string
    name: string
    birth: string | null
    death: string | null
    description: string
    userData: UserData[]
    hasSpouse: boolean
    spouse: SpouseNode | null
    children: FamilyNode[]
  }
  interface Family {
    name: string
    family: FamilyNode | null
    id: string
  }
  type D3HierarchyNode<FamilyNode> = HierarchyNode<FamilyNode>
}

export {}
