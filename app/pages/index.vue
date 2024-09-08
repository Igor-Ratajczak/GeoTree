<template>
  <div id="root">
    <CreateTree />
    <Transition>
      <div v-if="state.window === 'person_add'" id="addPerson" class="window">
        <div class="title">Dodaj osobę</div>
        <div class="close" @click="state.window = null">X</div>
        <addPerson />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import CreateTree from './tree/CreateTree.vue'
  import addPerson from './window/addPerson.vue'
  import { state } from './state'

  // Function to close the modal when the Esc key is pressed
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && state.value.window !== null) {
      state.value.window = null // Close the modal if it's open
    }
  }

  // Add the Esc key listener when the component is mounted
  onMounted(() => {
    window.addEventListener('keydown', handleEsc)
  })

  // Remove the Esc key listener when the component is unmounted
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEsc)
  })
</script>

<style scoped lang="less">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  #tree-container {
    background-color: green;
    height: calc(100vh - 130px);
    width: 100%;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
