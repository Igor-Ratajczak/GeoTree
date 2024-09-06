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
    v-if="node.data.death"
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
      node.data.spouse.length > 12
        ? node.data.spouse.slice(0, 12) + '...'
        : node.data.spouse
    }}
  </text>
  <text
    v-if="node.data.spouse_birth"
    class="text"
    :x="x + 440"
    y="80"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    ur. {{ node.data.spouse_birth }}
  </text>
  <text
    v-if="node.data.spouse_death"
    class="text"
    :x="x + 440"
    y="110"
    font-size="20"
    @click="state.active_person = node.data.id"
  >
    zm. {{ node.data.spouse_death }}
  </text>
</template>

<script setup lang="ts">
  import type { HierarchyPointNode } from 'd3'
  import type { FamilyNode } from './index.vue'
  import { state } from './state'

  defineProps<{
    x: number
    node: HierarchyPointNode<FamilyNode>
  }>()
</script>

<style scoped>
  text {
    font-family: sans-serif;
  }
</style>
