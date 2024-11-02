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

  type Setting =
    | 'bg_main'
    | 'clr_main'
    | 'bg_window'
    | 'clr_window'
    | 'bg_input_file_button'
    | 'clr_input_file_button'
    | 'bg_input_file_button_hover'
    | 'clr_input_file_button_hover'
    | 'bg_svg_box'
    | 'clr_svg_box'
    | 'bg_svg_box_hover'
    | 'bg_svg_box_active'
    | 'bg_svg_box_option'
    | 'clr_svg_box_option'
    | 'bg_svg_box_option_hover'
    | 'bg_menu'
    | 'bg_menu_hover'
    | 'clr_menu'
    | 'bg_input_search'
    | 'clr_input_search'
    | 'bg_search_hint'
    | 'clr_search_hint'
    | 'bg_search_hint_hover'
    | 'clr_search_hint_hover'

  type SettingsItem = {
    id: Setting
    name: string
    default: string
    value: string
  }

  type SettingsList = 'main' | 'window' | 'file' | 'svg' | 'menu' | 'search'

  type Settings = {
    [name in SettingsList]: { id: SettingsList; title: string; data: SettingsItem[] }
  }

  type WindowTypes =
    | 'person_add'
    | 'person_details'
    | 'person_edit'
    | 'person_delete'
    | 'families'
    | 'import'
    | 'export'
    | 'settings'
    | 'about'
    | null
}

export {}
