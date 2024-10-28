<template>
  <div class="tree_structure">
    <div class="family parent">
      <input
        type="checkbox"
        name="family"
        id="importAllFamilies"
        v-model="importAllFamilies"
        @change="allFamiliesSelected()"
      />
      <label for="family">{{ text }} wszystkie rodziny</label>
      <div class="families child" v-for="(family, index) in props.data.AllFamilies" :key="index">
        <input type="checkbox" name="family" :id="'family' + index" v-model="families![index]" />
        <label :for="'family' + index">{{ text }} {{ family?.name }}</label>
      </div>
    </div>
    <div class="settings parent">
      <input type="checkbox" name="importSettings" id="importSettings" v-model="settings" />
      <label for="importSettings">{{ text }} ustawienia</label>
    </div>

    <div class="remove-actual-data" v-if="type === 'import'">
      <input
        type="checkbox"
        name="removeActualData"
        id="removeActualData"
        v-model="removeActualData"
      />
      <label for="removeActualData">Usuń aktualne dane</label>
    </div>
    <button class="button" @click="onClick">{{ text }}</button>
  </div>
</template>

<script setup lang="ts">
  import { useData, type Data } from '~/composables/useData'

  const props = defineProps<{
    type: 'import' | 'export'
    text: 'Importuj' | 'Eksportuj'
    data: Data
  }>()

  const removeActualData: Ref<boolean> = ref(false)
  const importAllFamilies: Ref<boolean> = ref(false)
  const families: Ref<Array<boolean | null>> = ref([null])
  const settings: Ref<boolean | null> = ref(null)

  // check is all family input is selected or not
  const allFamiliesSelected = () => {
    if (importAllFamilies.value === true) {
      props.data.AllFamilies.forEach((_, index: number) => (families.value![index] = true))
    } else {
      families.value = [null]
    }
  }

  // watch the family inputs
  watch(
    () => families.value,
    (newVal) => {
      // if newVal has length equal to AllFamilies in importData  and newVal has all set to true
      if (newVal?.length === props.data.AllFamilies.length && newVal.every((val) => val === true)) {
        // set input all families to checked
        importAllFamilies.value = true
      } else {
        // else to not checked
        importAllFamilies.value = false
      }
    },
    { deep: true }
  )

  const onClick = async () => {
    const isImported = {
      removeActualData: removeActualData.value,
      families: importAllFamilies.value === true ? true : families.value!,
      settings: settings.value!,
    }
    if (props.type === 'import') {
      new useData(props.data, isImported).import()
    } else if (props.type === 'export') {
      new useData(props.data, isImported).export()
    } else {
    }

    removeActualData.value = false
    importAllFamilies.value = false
    families.value = [null]
    settings.value = null
  }
</script>

<style lang="less" scoped>
  input[type='checkbox'] {
    width: 50px;
    height: 50px;
    accent-color: green;
  }

  label {
    font-size: 1.5rem;
    font-weight: 900;
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
</style>
