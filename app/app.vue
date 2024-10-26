<template>
  <div>
    <AppHeader />
    <Index />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import Index from './components/index.vue'
</script>

<style lang="less">
  @import url('./assets/style.less');
  @import url('./assets/person.less');
</style>
