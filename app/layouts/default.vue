<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
</script>

<style scoped lang="less"></style>
