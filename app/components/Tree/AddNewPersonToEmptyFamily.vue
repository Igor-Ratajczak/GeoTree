<template>
  <div class="add-new-person">
    <button @click="add">Dodaj nową osobę</button>
  </div>
</template>

<script lang="ts" setup>
const { state } = useAppStore()

const add = () => {
  state.window = 'person_add'
  const id = uuid()
  state.selectedPersonData = {
    id: state.AllFamilies[useFamily.getIndex()]?.id + id,
    icon:'',
    name: '',
    birth: '',
    death: '',
    description: '',
    userData: [],
    hasSpouse: false,
    spouse : {
      name: '',
      birth: '',
      death:'',
      description: '',
      userData: [],
    },
    children: []
  }
  state.hasParent = false
  state.addOptionPerson = 'parent'
}
</script>

<style lang="less" scoped>
.add-new-person {
  position: fixed;
  display: grid;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 130px);
  align-items: center;

  button {
    width: max-content;
    height: max-content;
    padding: 1em 2em;
    border-radius: 10px;
    font-size: var(--font-size);
    box-shadow: 0 0 50px 20px var(--clr_main);
    background-color: #ffffffb0;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #ffffff;
    }
  }
}
</style>