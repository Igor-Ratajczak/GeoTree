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
        <WindowDataTemplate
          v-if="importData !== null"
          type="import"
          text="Importuj"
          :data="importData"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const input = useTemplateRef('file')
  const text = ref('Wybierz plik.')
  const importData: Ref<Data | null> = ref(null)

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

    .remove-actual-data {
      display: flex;
      flex-direction: row;
      gap: 1em;
      justify-content: center;
      align-items: center;
    }
  }
</style>
