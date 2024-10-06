<template>
  <Transition name="window">
    <div v-if="state.window.value === 'about'" id="aboutSite" class="window">
      <div class="title">O GenTree</div>
      <div class="close" @click="state.window.value = null">X</div>
      <div class="content">
        <p>GenTree to aplikacja, ktora tworzy pomorze ci stworzyć twoje drzewo genealogiczne.</p>
        <p>Wersja: 0.0.1</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'
</script>
