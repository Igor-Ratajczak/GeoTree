import { state } from '../state'
import { set } from './idb/manageIDB'

/**
 * updateTree
 */
export class updateTree {
  private data
  constructor(updateData: FamilyNode) {
    this.data = updateData
  }

  public add(icons: Icon, option: 'parent' | 'child' | null) {
    // Add the person to the family tree
    if (option === 'parent') {
      const family = state.familyTree.value!
      this.data.children.push(family)
      set(state.numberPeople.value, icons.person, icons.spouse)
      state.familyTree.value = this.data
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
      this.getNode(
        state.familyTree.value!,
        state.selectedPersonData?.value?.id ? state.selectedPersonData?.value?.id : 0
      ).then((node) => {
        if (!node) return
        set(state.numberPeople.value, icons.person, icons.spouse)
        node.children?.push(this.data)
        state.numberPeople.value += 1
      })
    }
  }
  public save(icons: Icon) {
    // Edit the person in the family tree

    set(state.selectedPersonData.value?.id, icons.person, icons.spouse)
    this.getNode(
      state.familyTree.value!,
      state.selectedPersonData?.value?.id ? state.selectedPersonData?.value?.id : 0
    ).then((node) => {
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
  public delete(parentID: number | null) {
    if (parentID !== null) {
      // Delete the person from the family tree
      this.getNode(state.familyTree.value!, parentID).then((node) => {
        node?.children?.forEach((child) => {
          if (child.id === this.data.id) {
            node?.children?.splice(node?.children?.indexOf(child), 1)
          }
        })
      })
    } else {
      state.familyTree.value = null
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
  private getNode(node: FamilyNode, targetId: number): Promise<FamilyNode | null> {
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
