<template>
  <div class="title">Dodaj osobę</div>
  <div class="close" @click="close">X</div>
  <Transition name="to-left">
    <div class="add-option-person" v-if="option === null">
      <div class="option" @click="setOption('parent')">Dodaj rodziców</div>
      <div class="option" @click="setOption('child')">Dodaj dziecko</div>
    </div>
  </Transition>
  <div class="form" v-if="option !== null">
    <PersonForm :type="'person'" :option="'add'" />
    <div id="spouse" class="checkbox">
      <input type="checkbox" name="isSpouse" id="isSpouse" v-model="hasSpouse" />
      <label for="isSpouse">Dodaj współmałżonka</label>
      <PersonForm v-if="hasSpouse" :type="'spouse'" :option="'add'" />
    </div>
    <button class="add" @click="addPerson">Dodaj nową osobę</button>
  </div>
</template>

<script setup lang="ts">
  import PersonForm from './PersonForm.vue'

  const { state } = useAppStore()

  const hasSpouse = ref(false)

  const option: Ref<'parent' | 'child' | null> = ref(state.addOptionPerson)

  // watch if it has spouse change and update this in personForm
  watch(hasSpouse, (newValue) => {
    state.personForm.hasSpouse = newValue
  })

  // Select option 'parent' or 'child' to add new person
  const setOption = (val: 'parent' | 'child') => {
    if (val === 'parent') hasSpouse.value = true
    option.value = val
  }

  // close window and set const to default
  const close = () => {
    state.window = null
    hasSpouse.value = false
  }

  /**
   * Add person with values from personForm
   */
  const addPerson = () => {
    // create unique ID to person
    const uuid = crypto.randomUUID()
    const uniqueId = `${uuid}-${new Date().getTime()}`

    // get all values from personForm
    const newChild = {
      icon: uniqueId + '-photo',
      name: state.personForm?.name,
      birth: state.personForm?.birth,
      death: state.personForm?.death,
      description: state.personForm?.description,
      userData: state.personForm?.userData,
      hasSpouse: state.personForm?.hasSpouse,
      spouse: state.personForm?.spouse,
      children: [],
      id: uniqueId,
    } as FamilyNode

    // set icon unique ID and icon to person and spouse
    const icons = {
      id: uniqueId + '-photo',
      person: state.personForm.icon,
      spouse: state.personForm.spouse?.icon || '',
    }

    // send new person data to update family tree
    new Person(newChild, state.selectedPersonData!.id).add(icons, option.value!)

    // set const to default
    hasSpouse.value = false
    option.value = null
  }
</script>

<style scoped lang="less">
  .to-left-enter-active,
  .to-left-leave-active {
    transform: translate(-50%, -50%) !important;
    transition: all 1s ease;
  }

  .to-left-enter-from {
    transform: translate(-50%, -50%) !important;
  }
  .to-left-leave-to {
    transform: translate(-200%, -50%) !important;
  }

  .add-option-person {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: max-content;
    height: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 2em;
    grid-column: 1/3;

    .option {
      width: 100%;
      height: 3em;
      padding: 1em 6em;
      font-size: 1.5rem;
      border-radius: 25px;
      border: none;
      color: black;
      outline: 5px solid black;
      font-weight: 900;
      transition: all 0.2s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        outline: 5px solid black;
        transform: scale(1.1);
      }
    }
  }
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
