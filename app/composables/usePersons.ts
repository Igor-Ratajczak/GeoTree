const { state } = useAppStore()

export class Person {
  data: FamilyNode
  key: string
  constructor(updateData: FamilyNode | null, id: string) {
    this.data = updateData!
    this.key = id
  }
  /** Search for a person in the family tree
   * @returns person
   */
  private getPerson(person: FamilyNode, id: string): Promise<FamilyNode | null> {
    return new Promise((resolve, reject) => {
      if (!person) return resolve(null)

      if (person.id === id) {
        // Reset the form
        resolve(person)
      } else if (person.children) {
        // Recursively search the children
        Promise.all(person.children.map((child) => this.getPerson(child, id)))
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
  /** Add a person to the family tree as a parent or child */
  public add(icons: Icon, type: 'parent' | 'child') {
    if (type === 'child') {
      const familyID = useFamily.getIndex()
      /* Find the parent of the person */
      this.getPerson(state.AllFamilies[familyID]?.family!, this.key).then((parent) => {
        if (parent !== null) {
          /* Add the person as a child of the parent */
          parent.children.push(this.data)
        }
      })
    } else {
      const familyIndex = useFamily.getIndex()
      console.log(state.AllFamilies[familyIndex])
      if (
        state.AllFamilies[familyIndex] !== null &&
        state.AllFamilies[familyIndex] !== undefined &&
        state.AllFamilies[familyIndex]!.family !== null
      ) {
        /* Set the person as the parent of the family */
        this.data.children.push(state.AllFamilies[familyIndex]!.family!)
        state.AllFamilies[familyIndex]!.family = this.data
      }else {
        state.AllFamilies[familyIndex]!.family = this.data
      }
    }
    /* Set the person's icon */
    set(this.data.id + '-photo', icons.person, icons.spouse)
    this.resetValues()
  }
  /** Edit a person in the family tree */
  public set(icons: Icon) {
    const familyID = useFamily.getIndex()
    /* Find the person in the family tree */
    this.getPerson(state.AllFamilies[familyID]?.family!, this.key).then((person) => {
      if (person !== null) {
        Object.assign(person, this.data)
      }
      /* Set the person's icon */
      set(this.data.id + '-photo', icons.person, icons.spouse)
      this.resetValues()
    })
  }
  /** Delete a person from the family tree */
  public remove(parentID: string) {
    const familyID = useFamily.getIndex()
    /* Find the parent of the person */
    this.getPerson(state.AllFamilies[familyID]?.family!, parentID).then((parent) => {
      if (parent !== null) {
        /* Remove the person from the family tree */
        parent.children.filter((person) => {
          if (person.id === this.key) {
            parent.children.splice(parent.children.indexOf(person), 1)
            del(this.key + '-photo')
          }
        })
      } else {
        state.AllFamilies[familyID]!.family = null
      }
      this.resetValues()
    })
  }
  /** Reset the form */
  private resetValues() {
    state.window = null
    state.selectedPersonData = null
    state.addOptionPerson = null
    state.personForm = {
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
