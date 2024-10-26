<template>
  <Transition name="window">
    <div v-if="state.window === 'export'" id="exportData" class="window">
      <div class="title">Eksportuj dane</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="exports">
        <div class="tree_structure">
          <div class="family parent">
            <input
              type="checkbox"
              name="family"
              id="importAllFamilies"
              v-model="importAllFamilies"
              @change="allFamiliesSelected()"
            />
            <label for="family">Eksportuj wszystkie rodziny</label>
            <div class="families child" v-for="(family, index) in state.AllFamilies" :key="index">
              <input
                type="checkbox"
                name="family"
                :id="'family' + index"
                v-model="families[index]"
              />
              <label :for="'family' + index">Eksportuj {{ family?.name }}</label>
            </div>
          </div>
          <div class="settings parent">
            <input type="checkbox" name="importSettings" id="importSettings" v-model="settings" />
            <label for="importSettings">Eksportuj ustawienia</label>
          </div>
        </div>
        <button class="button" @click="exportData">Eksportuj</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  interface Data {
    icons: Icon[] | null
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

  const removeActualData = ref(false)
  const importAllFamilies: Ref<boolean> = ref(false)
  const families: Ref<Array<boolean | null>> = ref([null])
  const settings: Ref<boolean | null> = ref(null)

  // check is all family input is selected or not
  const allFamiliesSelected = () => {
    if (importAllFamilies.value === true) {
      state.AllFamilies.forEach((_, index: number) => (families.value![index] = true))
    } else {
      families.value = [null]
    }
  }

  // watch the family inputs
  watch(
    () => families.value,
    (newVal) => {
      // if newVal has length equal to AllFamilies in importData  and newVal has all set to true
      if (newVal.length === state.AllFamilies.length && newVal.every((val) => val === true)) {
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
   * Set data from importData to state.ts
   */
  const exportData = async () => {
    const icons: Icon[] = await getAll()
    const exportedIcons: Icon[] = []

    // check which families is checked
    const selectedFamilies =
      importAllFamilies.value === true
        ? state.AllFamilies
        : state.AllFamilies.filter((_, index: number) => families.value![index])

    icons.forEach((icon) => {
      if (selectedFamilies.filter((family) => family?.family?.id === icon.id)) {
        exportedIcons.push(icon)
      }
    })

    // check is settings is checked
    const selectedSettings = settings.value ? state.settings : null

    /**
     * Converts the given data into a JSON file and prompts the user to download it.
     *
     * @param data - The data to be converted into a JSON file.
     * @param filename - The desired name for the downloaded file, without the file extension.
     */
    const JSONToFile = (data: Data, filename: string) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    // save json file with selected data
    JSONToFile(
      { icons: icons, AllFamilies: selectedFamilies, settings: selectedSettings },
      selectedFamilies.length > 0
        ? selectedSettings === null
          ? 'Rodzina - GenTree'
          : 'Rodzina + ustawienia - GenTree'
        : 'Ustawienia - GenTree'
    )

    // set all const to default
    removeActualData.value = false
    families.value = [null]
    importAllFamilies.value = false
    settings.value = null

    // close window
    state.window = null
  }
</script>

<style scoped lang="less">
  .exports {
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
