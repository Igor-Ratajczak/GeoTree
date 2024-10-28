export interface Data {
  icons: Icon[]
  AllFamilies: Array<Family | null>
  settings:
    | [
        {
          name: string
          value: string
        }
      ]
    | null
}
interface IsImported {
  families: boolean | Array<boolean | null>
  settings: boolean
  removeActualData: boolean
}
const { state } = useAppStore()
export class useData {
  private data: Data
  private isImported: IsImported
  constructor(data: Data, isImported: IsImported) {
    this.data = data
    this.isImported = isImported
  }

  private checkSelectedData() {
    const selectedFamilies =
      this.isImported.families === true
        ? this.data.AllFamilies
        : this.data.AllFamilies.filter(
            (_, index: number) => (this.isImported.families! as Array<boolean | null>)[index]
          )

    const selectedData: Data = {
      icons: [],
      AllFamilies: selectedFamilies,
      settings: this.data.settings,
    }

    this.data.icons.forEach((icon) => {
      if (selectedFamilies.filter((family) => family?.family?.id === icon.id)) {
        selectedData.icons.push(icon)
      }
    })

    return selectedData
  }

  private ToJSONFile(data: Data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url

    a.download =
      data.AllFamilies.length > 0
        ? data.settings === null
          ? 'Rodzina - GenTree'
          : 'Rodzina + ustawienia - GenTree'
        : 'Ustawienia - GenTree'
    a.click()
  }

  public import() {
    const selectedData = this.checkSelectedData()

    if (this.isImported.removeActualData === true) {
      state.AllFamilies = selectedData.AllFamilies
      state.settings = selectedData.settings
      clear() // clear icons in IDB
      state.window = null
    } else if (this.isImported.removeActualData === false) {
      state.AllFamilies.push(...selectedData.AllFamilies)
      state.settings = selectedData.settings
      state.window = null
    }

    this.data.icons.forEach((icon) => {
      set(icon.id, icon.person, icon.spouse)
    })
  }

  public export() {
    const selectedData = this.checkSelectedData()
    this.ToJSONFile(selectedData)
  }
}
