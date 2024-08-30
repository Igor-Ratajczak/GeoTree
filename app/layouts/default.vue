<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
</script>

<style scoped lang="less"></style>
