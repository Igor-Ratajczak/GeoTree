<template>
  <text
    class="text"
    :x="x + 150"
    y="30"
    font-size="25"
    @click="state.active_person = node.data.id"
  >
    {{
      node.data.name.length > 12
        ? node.data.name.slice(0, 12) + '...'
        : node.data.name
    }}
  </text>
  <text
    class="text"
    :x="x + 150"
    y="80"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    ur. {{ node.data.birth }}
  </text>
  <text
    v-if="node.data.death !== null"
    class="text"
    :x="x + 150"
    y="110"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    zm. {{ node.data.death }}
  </text>
  <text
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
        : null
    }}
  </text>
  <text
    v-if="node.data.spouse?.birth"
    class="text"
    :x="x + 440"
    y="80"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    ur. {{ node.data.spouse.birth }}
  </text>
  <text
    v-if="node.data.spouse !== null && node.data.spouse.death !== null"
    class="text"
    :x="x + 440"
    y="110"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    zm. {{ node.data.spouse?.death }}
  </text>
</template>

<script setup lang="ts">
  import { state } from '../state'

  defineProps<{
    x: number
    node: D3HierarchyPointNode<FamilyNode>
  }>()
</script>

<style scoped>
  text {
    font-family: sans-serif;
  }
</style>
