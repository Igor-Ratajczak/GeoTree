<template>
  <Transition name="window">
    <div
      v-if="state.window.value === 'person_add'"
      id="addPerson"
      class="window"
    >
      <div class="title">Dodaj osobę</div>
      <div class="close" @click="close">X</div>
      <div
        class="add-option-person"
        v-if="state.hasParent.value === false && optionSelected === false"
      >
        <div
          class="option"
          @click="
            () => {
              optionSelected = true
              option = 'parent'
            }
          "
        >
          Dodaj rodziców
        </div>
        <div
          class="option"
          @click="
            () => {
              optionSelected = true
              option = 'child'
            }
          "
        >
          Dodaj dziecko
        </div>
      </div>
      <div class="form" v-if="optionSelected">
        <PersonForm :type="'person'" :option="'add'" />
        <div id="spouse" class="checkbox">
          <input
            type="checkbox"
            name="isSpouse"
            id="isSpouse"
            v-model="hasSpouse"
          />
          <label for="isSpouse">Dodaj współmałżonka</label>
          <PersonForm v-if="hasSpouse" :type="'spouse'" :option="'add'" />
        </div>
        <button class="add" @click="addPerson">Dodaj nową osobę</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../state'
  import { updateTree } from '../tree/updateTree'
  import PersonForm from './PersonForm.vue'

  const hasSpouse = ref(false)
  const optionSelected = ref(false)
  const option: Ref<'parent' | 'child' | null> = ref(null)

  watch(hasSpouse, (newValue) => {
    state.personForm.value.hasSpouse = newValue
  })

  const close = () => {
    state.window.value = null
    optionSelected.value = false
    hasSpouse.value = false
  }

  const addPerson = () => {
    optionSelected.value = false
    hasSpouse.value = false

    const newChild = {
      name: state.personForm.value?.name,
      birth: state.personForm.value?.birth,
      death: state.personForm.value?.death,
      description: state.personForm.value?.description,
      userData: state.personForm.value?.userData,
      hasSpouse: state.personForm.value?.hasSpouse,
      spouse: state.personForm.value?.spouse,
      children: [],
      id: state.numberPeople.value,
    } as FamilyNode

    const icons = {
      person: state.personForm.value.icon,
      spouse: state.personForm.value.spouse?.icon || '',
    }

    new updateTree(newChild).add(icons, option.value)
  }
</script>

<style scoped lang="less">
  button {
    width: 80%;
    height: 3em;
    font-size: 1.5rem;
    border-radius: 25px;
    border: none;
    color: black;
    outline: 5px solid black;
    font-weight: 900;
    transition: all 0.2s ease;
    cursor: pointer;

    &.add {
      background-color: green;
      color: white;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 120%;
        top: -10%;
        left: -50%;
        background-color: rgba(255, 255, 255, 0.719);
        transform: rotate(-45deg);
        transition: all 1s ease;
      }

      &:hover::before {
        left: 100%;
      }

      &:hover {
        outline: 5px solid black;
        transform: scale(1.1);
        color: white;
      }
    }

    &:hover {
      outline-width: 10px;
      outline-color: green;
      color: green;
    }
  }

  .checkbox {
    display: grid;
    gap: 10px;
    align-items: center;
    justify-items: center;
    width: 100%;

    input[type='checkbox'] {
      width: 30px;
      height: 30px;
      cursor: pointer;
      accent-color: green;
    }
    input[type='checkbox']:checked ~ .hidden {
      display: grid;
    }
    .hidden {
      gap: 30px;
      justify-items: center;
      align-content: baseline;
      border-top: 2px solid black;
      padding-top: 2em;
      width: 100%;
    }
  }
</style>
