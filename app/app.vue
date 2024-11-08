<template>
  <VitePwaManifest />
  <div>
    <AppHeader />
    <AppIndex />
    <PwaPrompt />
    <AppFooter />
  </div>
</template>

<script setup>
useHead({
  title: 'GeoTree',
  meta: [
    { name: 'description', content: 'GenTree to aplikacja, która tworzy pomoże ci stworzyć twoje drzewo genealogiczne.' },
    { name: 'keywords', content: 'GeoTree, drzewo genealogiczne, drzewo, genealogia' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'public/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'pl'
  }
})
</script>

<style lang="less">
  @import url('./assets/style.less');
  @import url('./assets/person.less');
</style>