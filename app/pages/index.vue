<template>
  <div id="root">
    <CreateTree />
    <Transition name="window">
      <div v-if="state.window === 'person_add'" id="addPerson" class="window">
        <div class="title">Dodaj osobę</div>
        <div class="close" @click="state.window = null">X</div>
        <addPerson />
      </div>
    </Transition>
    <Transition name="window">
      <div
        v-if="state.window === 'person_details'"
        id="detailsPerson"
        class="window"
      >
        <div class="title">Dane o osobie</div>
        <div class="close" @click="state.window = null">X</div>
        <detailsPerson />
      </div>
    </Transition>
    <Transition name="window">
      <div v-if="state.window === 'person_edit'" id="editPerson" class="window">
        <div class="title">Edytuj dane o osobie</div>
        <div class="close" @click="state.window = null">X</div>
        <EditPerson />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import CreateTree from './tree/CreateTree.vue'
  import addPerson from './window/addPerson.vue'
  import { state } from './state'
  import detailsPerson from './window/detailsPerson.vue'
  import EditPerson from './window/editPerson.vue'

  // Function to close the modal when the Esc key is pressed
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && state.window !== null) {
      state.window = null // Close the modal if it's open
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
  .window-enter-active {
    animation: width 1s ease forwards;
  }
  .window-leave-active {
    transition: all 1s;
  }

  .window-enter-from,
  .window-leave-to {
    opacity: 0;
  }

  @keyframes width {
    0% {
      width: 0;
    }
    100% {
      width: 40vw;
    }
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
