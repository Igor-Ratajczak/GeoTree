<template>
  <div id="root">
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
  import icon from '/assets/logo.jpg'

  const { state } = useAppStore()

  // on press 'esc' close window
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && state.window !== null) {
      state.window = null
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleEsc)
  })

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
#root {
  width: 100vw;
  height: calc(100vh - 130px);;
  display: grid;
  place-items: center;
}
  @keyframes width {
    0% {
      width: 0;
    }
    100% {
      @media screen and (min-width: 768px) {
        width: 100vw;
      }
      @media screen and (min-width: 1200px) {
        width: 60vw;
      }
      @media screen and (min-width: 1600px) {
        width: 40vw;
      }
    }
  }
</style>
