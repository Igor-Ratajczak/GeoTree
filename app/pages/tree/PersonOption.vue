<template>
  <g
    class="options"
    :transform="`translate(${rectX + rectWidth / 2 - 25},${rectHeight + 2})`"
    :data-x="rectX"
    :data-width="rectWidth"
  >
    <g
      class="option"
      :transform="`translate(${-50},${2})`"
      @click="
        () => {
          state.window = 'person_add'
          state.selectedPersonData = node.data
        }
      "
    >
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>

    <g
      class="option"
      :transform="`translate(${0},${2})`"
      @click="
        () => {
          state.window = 'person_details'
          state.selectedPersonData = node.data
        }
      "
    >
      <rect width="50" height="50"></rect>
      <AboutIcon />
    </g>
    <g
      class="option"
      :transform="`translate(${50},${2})`"
      @click="
        () => {
          state.window = 'person_edit'
          state.selectedPersonData = node.data
        }
      "
    >
      <rect width="50" height="50"></rect>
      <EditIcon />
    </g>
  </g>
</template>

<script setup lang="ts">
  import type { HierarchyPointNode } from 'd3'
  import { state } from '../state'
  import AboutIcon from './icons/aboutIcon.vue'
  import EditIcon from './icons/editIcon.vue'

  defineProps<{
    rectX: number
    rectWidth: number
    rectHeight: number
    node: HierarchyPointNode<FamilyNode>
  }>()
</script>

<style scoped lang="less">
  .option {
    &:hover rect {
      fill: lightblue;
    }
    rect {
      fill: white;
      stroke: black;
      stroke-width: 5;
    }
    text {
      text-anchor: middle;
      font-size: 45px;
      font-family: sans-serif;
      fill: black;
    }
  }
</style>
