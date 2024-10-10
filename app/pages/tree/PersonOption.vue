<template>
  <g
    class="options"
    :transform="`translate(${rectX + rectWidth / 2 - 25},${rectHeight + 2})`"
    :data-x="rectX"
    :data-width="rectWidth"
  >
    <g class="option" :transform="`translate(${-50},${2})`" @click="add()">
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>

    <g
      class="option"
      :transform="`translate(${0},${2})`"
      @click="
        () => {
          state.window.value = 'person_details'
          state.selectedPersonData.value = node.data
        }
      "
    >
      <rect width="50" height="50"></rect>
      <AboutIcon />
    </g>
    <g class="option" :transform="`translate(${50},${2})`" @click="edit()">
      <rect width="50" height="50"></rect>
      <EditIcon />
    </g>
    <g
      class="option"
      :transform="`translate(${100},${2})`"
      @click="
        () => {
          state.selectedPersonData.value = node.data
          state.deletePersonParentId.value = node.parent ? node.parent.data.id : null

          state.window.value = 'person_delete'
        }
      "
    >
      <rect width="50" height="50"></rect>
      <DeleteIcon />
    </g>
  </g>
</template>

<script setup lang="ts">
  import { state } from '../state'
  import AboutIcon from './icons/aboutIcon.vue'
  import DeleteIcon from './icons/deleteIcon.vue'
  import EditIcon from './icons/editIcon.vue'
  import { get } from './idb/manageIDB'

  const props = defineProps<{
    rectX: number
    rectWidth: number
    rectHeight: number
    node: D3HierarchyNode<FamilyNode>
  }>()

  const add = () => {
    state.window.value = 'person_add'
    state.selectedPersonData.value = props.node.data
    state.hasParent.value = props.node.parent === null ? false : true
  }

  const edit = () => {
    const node = props.node
    get(node.data.id + '-photo').then((icon: Icon) => {
      state.window.value = 'person_edit'
      state.selectedPersonData.value = node.data
      state.personForm.value = {
        icon: icon.person,
        name: node.data.name,
        birth: node.data.birth,
        death: node.data.death,
        description: node.data.description,
        userData: node.data.userData,
        hasSpouse: node.data.hasSpouse,
        spouse:
          node.data.spouse === null
            ? null
            : {
                icon: icon.spouse,
                name: node.data.spouse.name,
                birth: node.data.spouse.birth,
                death: node.data.spouse.death,
                description: node.data.spouse.description,
                userData: node.data.spouse.userData,
              },
      }
    })
  }
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

      &.delete {
        fill: red;
        font-family: fantasy;
      }
    }
  }
</style>
