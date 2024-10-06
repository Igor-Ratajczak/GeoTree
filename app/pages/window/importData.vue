<template>
  <Transition name="window">
    <div v-if="state.window.value === 'import'" id="importData" class="window">
      <div class="title">Importuj dane</div>
      <div class="close" @click="state.window.value = null">X</div>
      <div class="imports">
        <div class="upload-file">
          <input type="file" name="file" id="file" accept=".json" @change="onFileChange($event)" />
        </div>
        <div class="tree_structure" v-if="importData !== null">
          <div class="family parent">
            <input
              type="checkbox"
              name="family"
              id="family"
              @change="
                ;($event.target as HTMLInputElement).checked === true
                  ? (checked = true)
                  : (checked = false)
              "
            />
            <label for="family">Importuj wszystkie rodziny</label>
            <div class="families child">
              <input type="checkbox" name="family" id="family" v-model="checked" />
              <label for="family">Importuj {{ importData.name }}</label>
            </div>
          </div>
          <div class="settings parent">
            <input type="checkbox" name="settings" id="settings" />
            <label for="settings">Importuj ustawienia</label>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'

  const checked = ref(false)

  const importData: Ref<FamilyNode | null> = ref(null)

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e) => {
      importData.value = JSON.parse(e.target?.result as string)
    }
  }
</script>

<style scoped lang="less">
  .imports {
    grid-column: 1/3;
    display: grid;
    grid-template-rows: 1fr 5fr;
    gap: 2em;

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
          width: 50px;
          height: 50px;
        }

        label {
          grid-row: 1;
          grid-column: 2;
        }

        .child {
          display: flex;
          grid-row: 2;
          grid-column: 2;
          margin-left: 2em;
          gap: 1em;
          align-items: center;
        }
      }
    }
  }
</style>
