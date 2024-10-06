<template>
  <Transition name="window">
    <div v-if="state.window.value === 'about'" id="exportData" class="window">
      <div class="title">Export danych</div>
      <div class="close" @click="state.window.value = null">X</div>
      <div class="data">
        <div class="family">
          <input type="checkbox" name="family" id="family" />
          <label for="family">Dodaj rodzinę pierwszą</label>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'
</script>
