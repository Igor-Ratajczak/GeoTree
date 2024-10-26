<template>
  <div class="title">Edytuj dane o osobie</div>
  <div class="close" @click="state.window = null">X</div>
  <div class="form" v-if="state.selectedPersonData">
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
  const { state } = useAppStore()

  // check if selected person has spouse
  const hasSpouse: Ref<boolean> = ref(state.selectedPersonData?.hasSpouse || false)

  // watch on change of selected person
  watch(
    () => state.selectedPersonData,
    (newValue: FamilyNode | null) => {
      if (newValue) hasSpouse.value = newValue.hasSpouse
    },
    { deep: true }
  )
  // watch on change of hasSpouse
  watch(
    hasSpouse,
    (newValue) => {
      state.personForm.hasSpouse = newValue
    },
    { deep: true }
  )
  /**
   * Save data about person from form to local storage
   */
  const saveData = () => {
    const data = {
      icon: state.selectedPersonData?.id + '-photo',
      name: state.personForm?.name,
      birth: state.personForm?.birth,
      death: state.personForm?.death,
      description: state.personForm?.description,
      userData: state.personForm?.userData,
      hasSpouse: state.personForm?.hasSpouse,
      spouse: state.personForm?.spouse,
      children: [],
      id: state.selectedPersonData?.id,
    } as FamilyNode

    const icons = {
      id: state.selectedPersonData?.id + '-photo',
      person: state.personForm.icon,
      spouse: state.personForm.spouse?.icon || '',
    }

    // send update person data to update family tree
    new Person(data, state.selectedPersonData!.id).set(icons)
  }
</script>

<style scoped lang="less"></style>
