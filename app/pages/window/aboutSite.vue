<template>
  <Transition name="window">
    <div v-if="state.window.value === 'about'" id="aboutSite" class="window">
      <div class="title">O GenTree</div>
      <div class="close" @click="state.window.value = null">X</div>
      <div class="content">
        <p>GenTree to aplikacja, ktora tworzy pomoże ci stworzyć twoje drzewo genealogiczne.</p>
        <p>Wersja: 0.0.1</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'
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
