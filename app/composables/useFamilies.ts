const { state } = useAppStore()

class family {
  private searchedPeople: Array<FamilyNode> = []

  /** Get the selected family index of the all families */
  public getIndex = () => {
    const i = state.selectedFamily
    let number = 0

    state.AllFamilies.filter((family, index) => {
      if (family?.id === i) number = index
      return index
    })
    return number
  }

  /**
   * Filter the family data based on the search input.
   * @param {FamilyNode} search - The search words.
   */
  public async filter(search: string, person?: FamilyNode): Promise<Array<FamilyNode>> {
    if (!person) {
      const index = this.getIndex()
      person = state.AllFamilies[index]!.family || person
      this.searchedPeople = []
    }

    if (!person) return []

    const words = search
      .toUpperCase()
      .split(' ')
      .filter((word) => word)
    const matchesAllWords = words.every((word) => this.matchesPersonData(person, word))

    if (matchesAllWords && !this.searchedPeople.includes(person)) {
      this.searchedPeople.push(person)
    }

    if (person.children) {
      await Promise.all(person.children.map((child) => this.filter(search, child)))
    }
    return this.searchedPeople
  }

  /** For check if the person matches the search */
  private matchesPersonData(person: FamilyNode, word: string) {
    return (
      person.name.toUpperCase().includes(word) ||
      person.birth?.toUpperCase().includes(word) ||
      person.death?.toUpperCase().includes(word) ||
      person.description?.toUpperCase().includes(word) ||
      person.userData?.some((data) => data.text.toUpperCase().includes(word)) ||
      person.spouse?.name?.toUpperCase().includes(word) ||
      person.spouse?.birth?.toUpperCase().includes(word) ||
      person.spouse?.death?.toUpperCase().includes(word) ||
      person.spouse?.description?.toUpperCase().includes(word) ||
      person.spouse?.userData?.some((data) => data.text.toUpperCase().includes(word))
    )
  }
}

export const useFamily = new family()
