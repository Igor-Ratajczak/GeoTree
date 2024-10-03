<template>
  <div id="root" v-if="success">
    <CreateTree />
    <addPerson />
    <detailsPerson />
    <EditPerson />
    <DeletePerson />
  </div>
</template>

<script setup lang="ts">
  import CreateTree from './tree/CreateTree.vue'
  import addPerson from './window/addPerson.vue'
  import { state } from './state'
  import detailsPerson from './window/detailsPerson.vue'
  import EditPerson from './window/editPerson.vue'
  import DeletePerson from './window/deletePerson.vue'
  import { set } from './tree/idb/manageIDB'
  import icon from '/assets/logo.jpg'

  const success = ref(false)
  const DBDeleteRequest = window.indexedDB.deleteDatabase('toDoList')

  // Function to close the modal when the Esc key is pressed
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && state.window !== null) {
      state.window.value = null // Close the modal if it's open
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

  DBDeleteRequest.onerror = () => {
    console.error('Error deleting database.')
  }

  DBDeleteRequest.onsuccess = () => {
    success.value = true
    const toDataURL = (url: string | URL | Request) =>
      fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsDataURL(blob)
            })
        )
    toDataURL(icon).then((dataUrl) => {
      set(0, dataUrl as string, dataUrl as string)
      set(1, dataUrl as string, '')
    })
  }
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
