<template>
  <Transition name="window">
    <div v-if="state.window === 'about'" id="aboutSite" class="window">
      <div class="title">O GenTree</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <p>GenTree to aplikacja, ktora tworzy pomoże ci stworzyć twoje drzewo genealogiczne.</p>
        <p>Wersja: 1.0.0</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()
</script>

<style scoped lang="less">
  .content {
    padding: 10px;
    font-size: max(2rem, 50px, 1em);
    user-select: text;

    p {
      text-align: center;
    }
  }
</style>
