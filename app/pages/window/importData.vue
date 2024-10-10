<template>
  <Transition name="window">
    <div v-if="state.window.value === 'import'" id="importData" class="window">
      <div class="title" @click="console.log(families)">Importuj dane</div>
      <div class="close" @click="state.window.value = null">X</div>
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
  import { state } from '../state'
  import { clear, set } from '../tree/idb/manageIDB'

  const input = useTemplateRef('file')
  const text = ref('Wybierz plik.')
  interface Data {
    icons: Icon[]
    AllFamilies: [
      {
        name: string
        family: FamilyNode
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

  const allFamiliesSelected = () => {
    if (importAllFamilies.value === true) {
      importData.value?.AllFamilies.forEach((_, index: number) => (families.value![index] = true))
    } else {
      families.value = [null]
    }
  }
  watch(
    () => families.value,
    (newVal) => {
      if (
        newVal.length === importData.value?.AllFamilies.length &&
        newVal.every((val) => val === true)
      ) {
        importAllFamilies.value = true
      } else {
        importAllFamilies.value = false
      }
    },
    {
      deep: true,
    }
  )

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    text.value = file.name
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      importData.value = JSON.parse(e.target?.result as string)
    }
  }
  const setData = () => {
    const selectedFamilies =
      importAllFamilies.value === true
        ? importData.value?.AllFamilies
        : importData.value?.AllFamilies.filter((_, index: number) => families.value![index])

    const selectedSettings = settings.value ? importData.value?.settings : null
    const icons = importData.value?.icons
    if (icons) {
      icons.forEach((icon) => {
        set(icon.id, icon.person, icon.spouse)
      })
    }
    if (removeActualData.value === true) {
      state.AllFamilies.value = selectedFamilies!
      state.settings.value = [selectedSettings!]
      state.window.value = null
      clear()
    } else if (removeActualData.value === false) {
      state.AllFamilies.value.push(...selectedFamilies!)
      state.settings.value?.push(selectedSettings!)
      if (importData.value?.icons)
        importData.value?.icons.forEach((icon) => set(icon.id, icon.person, icon.spouse))
      state.window.value = null
    }
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
