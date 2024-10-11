<template>
  <g
    class="options"
    :transform="`translate(${rectX + rectWidth / 2 - 25},${rectHeight + 2})`"
    :data-x="rectX"
    :data-width="rectWidth"
  >
    <g class="option" :transform="`translate(${-50},${2})`" @click="add">
      <rect width="50" height="50"></rect>
      <text :x="50 / 2" :y="50 / 2 + 4" dominant-baseline="middle">+</text>
    </g>

    <g class="option" :transform="`translate(${0},${2})`" @click="details">
      <rect width="50" height="50"></rect>
      <AboutIcon />
    </g>
    <g class="option" :transform="`translate(${50},${2})`" @click="edit">
      <rect width="50" height="50"></rect>
      <EditIcon />
    </g>
    <g class="option" :transform="`translate(${100},${2})`" @click="remove">
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

  /**
   * Add a new person.
   *
   * Set the window to person_add, selectedPersonData to the node's data,
   * and hasParent to whether the node has a parent.
   */
  const add = () => {
    state.window.value = 'person_add'
    state.selectedPersonData.value = props.node.data
    state.hasParent.value = props.node.parent === null ? false : true
  }

  /**
   * Open the person details window.
   *
   * Set the window to person_details and selectedPersonData to the node's data.
   */
  const details = () => {
    state.window.value = 'person_details'
    state.selectedPersonData.value = props.node.data
  }

  /**
   * Edit a person.
   *
   * Set the window to person_edit, selectedPersonData to the node's data,
   * and personForm to the node's data with the icon set to the result of
   * get(node.data.id + '-photo').
   * If the node has a spouse, set personForm.spouse to that spouse's data.
   * Otherwise, set personForm.spouse to null.
   */
  const edit = async () => {
    const { data } = props.node
    const icon = await get(data.id + '-photo')
    state.window.value = 'person_edit'
    state.selectedPersonData.value = data
    state.personForm.value = {
      icon: icon.person,
      name: data.name,
      birth: data.birth,
      death: data.death,
      description: data.description,
      userData: data.userData,
      hasSpouse: data.hasSpouse,
      spouse: data.hasSpouse
        ? {
            icon: icon.spouse,
            name: data.spouse.name,
            birth: data.spouse.birth,
            death: data.spouse.death,
            description: data.spouse.description,
            userData: data.spouse.userData,
          }
        : null,
    }
  }

  /**
   * Remove a person.
   *
   * Set the window to person_delete, selectedPersonData to the node's data,
   * and deletePersonParentId to the node's parent's id or null if the node
   * has no parent.
   */
  const remove = () => {
    state.selectedPersonData.value = props.node.data
    state.deletePersonParentId.value = props.node.parent ? props.node.parent.data.id : null
    state.window.value = 'person_delete'
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
