<template>
  <g
    class="options"
    :transform="`translate(${rectX + rectWidth / 2 - 25},${rectHeight + 2})`"
    :data-x="rectX"
    :data-width="rectWidth"
  >
    <g
      class="add_person"
      :transform="`translate(${-50},${2})`"
      @click="state.window = 'person_add'"
    >
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>

    <g class="add_person" :transform="`translate(${0},${2})`">
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>
    <g class="add_person" :transform="`translate(${50},${2})`">
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>
  </g>
</template>

<script setup lang="ts">
  import { state } from '../state'

  defineProps<{
    rectX: number
    rectWidth: number
    rectHeight: number
  }>()
</script>

<style scoped lang="less">
  .add_person {
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
