<template>
  <Transition name="window">
    <div v-if="state.window === 'import'" id="importData" class="window">
      <div class="title">Importuj dane</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="imports">
        <div class="upload-file">
          <button @click="input?.click()">{{ text }}</button>
          <input
            ref="file"
            type="file"
            name="file"
            id="file"
            accept=".json"
            @change="onFileChange"
          />
        </div>
        <div class="tree_structure" v-if="importData !== null">
          <div class="family parent">
            <input
              type="checkbox"
              name="family"
              id="importAllFamilies"
              v-model="importAllFamilies"
              @change="allFamiliesSelected()"
            />
            <label for="family">Importuj wszystkie rodziny</label>
            <div
              class="families child"
              v-for="(family, index) in importData.AllFamilies"
              :key="index"
            >
              <input
                type="checkbox"
                name="family"
                :id="'family' + index"
                v-model="families[index]"
              />
              <label :for="'family' + index">Importuj {{ family?.name }}</label>
            </div>
          </div>
          <div class="settings parent">
            <input type="checkbox" name="importSettings" id="importSettings" v-model="settings" />
            <label for="importSettings">Importuj ustawienia</label>
          </div>
        </div>
        <div class="remove-actual-data">
          <input
            type="checkbox"
            name="removeActualData"
            id="removeActualData"
            v-model="removeActualData"
          />
          <label for="removeActualData">Usuń aktualne dane</label>
        </div>
        <button class="button" @click="setData">Importuj</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const input = useTemplateRef('file') // input template for check upload file name
  const text = ref('Wybierz plik.') // show text if file is upload or not
  interface Data {
    icons: Icon[]
    AllFamilies: [
      {
        name: string
        family: FamilyNode
        id: string
      }
    ]
    settings: {
      name: string
      value: string
    } | null
  }

  const removeActualData = ref(false)
  const importAllFamilies: Ref<boolean> = ref(false)
  const families: Ref<Array<boolean | null>> = ref([null])
  const settings: Ref<boolean | null> = ref(null)
  const importData: Ref<Data | null> = ref(null)

  // check is all family input is selected or not
  const allFamiliesSelected = () => {
    if (importAllFamilies.value === true) {
      importData.value?.AllFamilies.forEach((_, index: number) => (families.value![index] = true))
    } else {
      families.value = [null]
    }
  }

  // watch the family inputs
  watch(
    () => families.value,
    (newVal) => {
      // if newVal has length equal to AllFamilies in importData  and newVal has all set to true
      if (
        newVal.length === importData.value?.AllFamilies.length &&
        newVal.every((val) => val === true)
      ) {
        // set input all families to checked
        importAllFamilies.value = true
      } else {
        // else to not checked
        importAllFamilies.value = false
      }
    },
    { deep: true }
  )

  /**
   * Get upload json file and set importData to text in json file
   * @param e Event
   */
  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0] // json file
    if (!file) return // check is not null
    text.value = file.name // text for input file is file name
    const reader = new FileReader() // create file reader
    reader.readAsText(file) // read this file
    reader.onload = (e) => {
      importData.value = JSON.parse(e.target?.result as string) // set importData to text in json file
    }
  }

  /**
   * Set data from importData to state.ts
   */
  const setData = () => {
    // check which families is checked
    const selectedFamilies =
      importAllFamilies.value === true
        ? importData.value?.AllFamilies
        : importData.value?.AllFamilies.filter((_, index: number) => families.value![index])

    // check is settings is checked
    const selectedSettings = settings.value ? importData.value?.settings : null

    // set or push data to site
    if (removeActualData.value === true) {
      state.AllFamilies = selectedFamilies!
      state.settings = [selectedSettings!]
      state.window = null
      clear()
    } else if (removeActualData.value === false) {
      state.AllFamilies.push(...selectedFamilies!)
      state.settings?.push(selectedSettings!)
      state.window = null
    }
    const icons = importData.value?.icons

    // set all icons to indexedDataBase
    icons?.forEach((icon) => {
      if (selectedFamilies?.filter((family) => family?.family?.id === icon.id)) {
        set(icon.id, icon.person, icon.spouse)
      }
    })

    // set all const to default
    removeActualData.value = false
    importData.value = null
    families.value = [null]
    importAllFamilies.value = false
    settings.value = null
    text.value = 'Wybierz plik.'
  }
</script>

<style scoped lang="less">
  .imports {
    grid-column: 1/3;
    display: grid;
    grid-template-rows: 1fr 5fr;
    gap: 2em;
    overflow: auto;
    padding: 2em;

    input[type='checkbox'] {
      width: 50px;
      height: 50px;
      accent-color: green;
    }

    label {
      font-size: 1.5rem;
      font-weight: 900;
    }

    .upload-file {
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 1em;
    }

    .tree_structure {
      display: flex;
      flex-direction: column;
      gap: 1em;

      .parent {
        display: grid;
        grid-template: auto auto / auto 1fr;
        gap: 1em;
        margin-left: 2em;
        align-items: center;
        height: max-content;

        input {
          grid-row: 1;
          grid-column: 1;
        }

        label {
          grid-row: 1;
          grid-column: 2;
        }

        .child {
          display: flex;
          grid-column: 2;
          margin-left: 2em;
          gap: 1em;
          align-items: center;
        }
      }
    }

    .remove-actual-data {
      display: flex;
      flex-direction: row;
      gap: 1em;
      justify-content: center;
      align-items: center;
    }
  }
</style>
