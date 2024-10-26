<template>
  <div id="root" v-if="success">
    <TreeCreateTree />
    <Transition name="window">
      <div v-if="state.window === 'person_add'" id="addPerson" class="window">
        <PersonAdd />
      </div>
    </Transition>
    <Transition name="window">
      <div v-if="state.window === 'person_details'" id="detailsPerson" class="window">
        <PersonView />
      </div>
    </Transition>
    <Transition name="window">
      <div v-if="state.window === 'person_edit'" id="editPerson" class="window">
        <PersonEdit />
      </div>
    </Transition>
    <PersonDelete />
    <WindowFamiliesManagement />
    <WindowImportData />
    <WindowExportData />
    <WindowUserSettings />
    <WindowAboutSite />
  </div>
</template>

<script setup lang="ts">
  import { set } from '../composables/useIDB'
  import icon from '/assets/logo.jpg'

  const { state } = useAppStore()

  const success = ref(false)
  const DBDeleteRequest = window.indexedDB.deleteDatabase('toDoList')

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
      set(
        'f7c0a496-e445-4f1c-930e-c6153f84359c-1728489705256-photo',
        dataUrl as string,
        dataUrl as string
      )
      set('305d61c8-27ce-46b0-a193-19e2f35b027c-1728491651735-photo', dataUrl as string, '')
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
