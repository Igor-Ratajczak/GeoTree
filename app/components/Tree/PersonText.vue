<template>
  <text class="text" :x="x + 150" y="30" font-size="25" @click="state.active_person = node.data.id">
    {{
      node.data.name
        ? node.data.name.length > 12
          ? node.data.name.slice(0, 12) + '...'
          : node.data.name
        : '???'
    }}
  </text>
  <text class="text" :x="x + 150" y="80" font-size="20" @click="state.active_person = node.data.id">
    ur. {{ node.data.birth !== '' ? node.data.birth : 'nie znana' }}
  </text>
  <text
    v-if="node.data.death !== ''"
    class="text"
    :x="x + 150"
    y="110"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    zm. {{ node.data.death !== '' ? node.data.death : 'nie znana' }}
  </text>
  <text
    v-if="node.data.hasSpouse"
    class="text"
    :x="x + 440"
    y="30"
    font-size="25"
    @click="state.active_person = node.data.id"
  >
    {{
      node.data.spouse?.name
        ? node.data.spouse?.name.length > 12
          ? node.data.spouse?.name.slice(0, 12) + '...'
          : node.data.spouse?.name
        : '???'
    }}
  </text>
  <text
    v-if="node.data.hasSpouse"
    class="text"
    :x="x + 440"
    y="80"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    ur.
    {{ node.data.spouse?.birth === '' ? 'nie znana' : node.data.spouse?.birth }}
  </text>
  <text
    v-if="node.data.hasSpouse && node.data.spouse && node.data.spouse.death !== ''"
    class="text"
    :x="x + 440"
    y="110"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    zm.
    {{ node.data.spouse?.death !== '' ? node.data.spouse?.death : 'nie znana' }}
  </text>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  defineProps<{
    x: number
    node: D3HierarchyNode<FamilyNode>
  }>()
</script>

<style scoped>
  text {
    font-family: sans-serif;
    fill: var('--clr_svg_box');
  }
</style>
