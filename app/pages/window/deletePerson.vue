<template>
  <Transition name="window">
    <div
      v-if="state.window.value === 'person_delete'"
      id="deletePerson"
      class="window"
    >
      <div class="title">Usuń osobę</div>
      <div class="close" @click="state.window.value = null">Anuluj</div>

      <button class="delete" @click="removePerson()">Usuń</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'
  import { updateTree } from '../tree/updateTree'

  const removePerson = () => {
    if (state.selectedPersonData.value) {
      new updateTree(state.selectedPersonData.value).delete(
        state.deletePersonParentId.value
      )
    }
  }
</script>
