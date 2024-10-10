<template>
  <div class="title">Edytuj dane o osobie</div>
  <div class="close" @click="state.window.value = null">X</div>
  <div class="form" v-if="state.selectedPersonData.value">
    <PersonForm :type="'person'" :option="'edit'" />
    <div id="spouse" class="checkbox">
      <input type="checkbox" name="isSpouse" id="isSpouse" v-model="hasSpouse" />
      <label for="isSpouse">Dodaj współmałżonka</label>
      <PersonForm v-if="hasSpouse" :type="'spouse'" :option="'edit'" />
    </div>
    <button class="add" @click="saveData">Zapisz</button>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../state'
  import { updateTree } from '../tree/updateTree'
  import PersonForm from './PersonForm.vue'

  const hasSpouse: Ref<boolean> = ref(state.selectedPersonData.value?.hasSpouse || false)

  watch(
    () => state.selectedPersonData,
    (newValue: Ref<FamilyNode | null>) => {
      if (newValue.value) hasSpouse.value = newValue.value.hasSpouse
    },
    { deep: true }
  )

  watch(
    hasSpouse,
    (newValue) => {
      state.personForm.value.hasSpouse = newValue
    },
    { deep: true }
  )
  const saveData = () => {
    const data = {
      name: state.personForm.value?.name,
      birth: state.personForm.value?.birth,
      death: state.personForm.value?.death,
      description: state.personForm.value?.description,
      userData: state.personForm.value?.userData,
      hasSpouse: state.personForm.value?.hasSpouse,
      spouse: state.personForm.value?.spouse,
      children: [],
      id: state.selectedPersonData.value?.id,
    } as FamilyNode

    const icons = {
      id: state.selectedPersonData.value?.id + '-photo',
      person: state.personForm.value.icon,
      spouse: state.personForm.value.spouse?.icon || '',
    }

    new updateTree(data).save(icons)
  }
</script>

<style scoped lang="less"></style>
