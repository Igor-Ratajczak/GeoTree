import { state } from '../state'
import { del, set } from './idb/manageIDB'

/**
 * updateTree
 */
export class updateTree {
  private data
  constructor(updateData: FamilyNode) {
    this.data = updateData
  }

  public add(icons: Icon, option: 'parent' | 'child' | null) {
    const i = state.selectedFamily.value
    // Add the person to the family tree
    if (option === 'parent') {
      this.data.children.push(state.AllFamilies.value[i]!.family!)
      set(this.data.id, icons.person, icons.spouse)
      state.AllFamilies.value[i]!.family = this.data
      state.window.value = null
      state.selectedPersonData.value = null
      state.personForm.value = {
        icon: '',
        name: '',
        birth: '',
        death: null,
        description: '',
        userData: [],
        hasSpouse: false,
        spouse: null,
      }
      state.numberPeople.value += 1
    } else if (option === 'child') {
      this.getNode(state.AllFamilies.value[i]!.family!, this.data.id).then((node) => {
        if (!node) return
        set(this.data.id, icons.person, icons.spouse)
        node.children?.push(this.data)
        state.numberPeople.value += 1
      })
    }
  }
  public save(icons: Icon) {
    const i = state.selectedFamily.value
    // Edit the person in the family tree
    set(this.data.id + '-photo', icons.person, icons.spouse)
    this.getNode(state.AllFamilies.value[i]!.family!, this.data.id).then((node) => {
      if (!node) return
      node.name = this.data.name
      node.birth = this.data.birth
      node.death = this.data.death
      node.description = this.data.description
      node.userData = this.data.userData
      node.hasSpouse = this.data.hasSpouse
      node.spouse = this.data.spouse
    })
  }
  public delete(parentID: string | null) {
    const i = state.selectedFamily.value
    if (parentID !== null) {
      // Delete the person from the family tree
      this.getNode(state.AllFamilies.value[i]!.family!, parentID).then((node) => {
        node?.children?.forEach((child) => {
          if (child.id === this.data.id) {
            node?.children?.splice(node?.children?.indexOf(child), 1)
            del(this.data.id + '-photo')
          }
        })
      })
    } else {
      state.AllFamilies.value[i]!.family = null
      state.window.value = null
      state.selectedPersonData.value = null
      state.personForm.value = {
        icon: '',
        name: '',
        birth: '',
        death: null,
        description: '',
        userData: [],
        hasSpouse: false,
        spouse: null,
      }
    }
  }
  private getNode(node: FamilyNode, targetId: string): Promise<FamilyNode | null> {
    return new Promise((resolve, reject) => {
      if (!node) return resolve(null)

      if (node.id === targetId) {
        state.window.value = null
        state.selectedPersonData.value = null
        state.personForm.value = {
          icon: '',
          name: '',
          birth: '',
          death: null,
          description: '',
          userData: [],
          hasSpouse: false,
          spouse: null,
        }
        resolve(node)
      } else if (node.children) {
        Promise.all(node.children.map((child) => this.getNode(child, targetId)))
          .then((results) => {
            const foundNode = results.find((result) => result !== null)
            resolve(foundNode || null)
          })
          .catch(reject)
      } else {
        resolve(null)
      }
    })
  }
}
