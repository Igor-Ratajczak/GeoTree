<template>
  <div class="form">
    <input
      type="text"
      class="name"
      placeholder="Imię i Nazwisko"
      v-model="name"
    />
    <input type="text" class="birth" placeholder="ur." v-model="birth" />
    <input type="text" class="death" placeholder="zm." v-model="death" />
    <input
      type="text"
      class="description"
      placeholder="opis"
      v-model="description"
    />
    <div class="user-data" ref="UserData">
      <div v-for="index in newUserData" :key="index" class="new-user-data">
        <input type="text" placeholder="Nazwa" />
        <input type="text" placeholder="tekst" />
      </div>
    </div>
    <button @click="addInput">Dodaj nowe pole</button>
    <div id="spouse" class="checkbox">
      <input
        type="checkbox"
        name="isSpouse"
        id="isSpouse"
        @click="hasSpouse = !hasSpouse"
      />
      <label for="isSpouse">Dodaj współmałżonka</label>
      <div v-if="hasSpouse" class="hidden">
        <input
          type="text"
          class="name"
          placeholder="Imię i Nazwisko wspołmałzonka"
          v-model="spouseName"
        />
        <input
          type="text"
          class="birth"
          placeholder="ur. wspołmałzonka"
          v-model="spouseBirth"
        />
        <input
          type="text"
          class="death"
          placeholder="zm. wspołmałzonka"
          v-model="spouseDeath"
        />
        <input
          type="text"
          class="description"
          placeholder="opis wspołmałzonka"
          v-model="spouseDescription"
        />
        <div class="user-data" ref="spouseUserData">
          <div
            v-for="index in newSpouseUserData"
            :key="index"
            class="new-user-data"
          >
            <input type="text" placeholder="Nazwa" />
            <input type="text" placeholder="tekst" />
          </div>
        </div>
        <button @click="addSpouseInput">Dodaj nowe pole</button>
      </div>
    </div>
    <button class="add" @click="addPerson">Dodaj nową osobę</button>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../state'

  const name = ref('')
  const birth = ref()
  const death = ref()
  const description = ref('')
  const hasSpouse = ref(false)
  const spouseName = ref('')
  const spouseBirth = ref()
  const spouseDeath = ref()
  const spouseDescription = ref('')
  const newUserData: Ref<number[]> = ref([])
  const newSpouseUserData: Ref<number[]> = ref([])

  const UserData: Ref<HTMLDivElement | null> = ref(null)
  const spouseUserData: Ref<HTMLElement | null> = ref(null)

  const addInput = () => {
    newUserData.value.push(newUserData.value.length + 1)
  }
  const addSpouseInput = () => {
    newSpouseUserData.value.push(newSpouseUserData.value.length + 1)
  }

  type Data = {
    name: string
    text: string
  }
  const getUserData = () => {
    const data: Data[] = []
    if (UserData.value && UserData.value?.children) {
      Array.from(UserData.value.children).forEach((node) => {
        data.push({
          name: (node.childNodes[0] as HTMLInputElement).value,
          text: (node.childNodes[1] as HTMLInputElement).value,
        })
      })
    }
    return data
  }

  const getSpouseUserData = () => {
    const data: Data[] = []
    if (spouseUserData.value && spouseUserData.value?.children) {
      Array.from(spouseUserData.value.children).forEach((node) => {
        data.push({
          name: (node.childNodes[0] as HTMLInputElement).value,
          text: (node.childNodes[1] as HTMLInputElement).value,
        })
      })
    }
    return data
  }

  const addPerson = () => {
    const newChild = {
      name: name.value,
      birth: birth.value,
      death: death.value === '' ? null : death.value,
      description: description.value,
      userData: getUserData(),
      spouse: hasSpouse.value
        ? {
            name: spouseName.value,
            birth: spouseBirth.value,
            death: spouseDeath.value === '' ? null : spouseDeath.value,
            description: spouseDescription.value,
            userData: getSpouseUserData(),
          }
        : null,
      children: [],
      id: state.numberPeople + 1,
    } as FamilyNode

    // Recursive function to update the tree
    const updateTree = (node: FamilyNode | undefined, targetId: number) => {
      if (!node) return
      // If the current parent is the selected person
      if (node.id === targetId) {
        // Add the new child to the found parent
        node.children?.push(newChild)
      } else {
        // Continue traversing through the children
        node.children?.forEach((child) => updateTree(child, targetId))
      }
    }

    // Update the tree starting from the root of the family tree
    updateTree(
      state.familyTree,
      state.selectedPersonData?.id ? state.selectedPersonData?.id : 1
    )

    state.window = null
    state.numberPeople += 1
  }
</script>

<style scoped lang="less">
  .form {
    display: grid;
    gap: 30px;
    grid-column: 1/3;
    justify-items: center;
    align-content: baseline;
    border-top: 2px solid black;
    padding-top: 2em;
    padding-bottom: 2em;
    overflow: auto;

    input[type='text'] {
      width: 80%;
      font-size: 1.5rem;
      height: 3em;
      text-align: center;
      border-radius: 25px;
      border: none;
      color: black;
      outline: 5px solid black;
      font-weight: 900;
      transition: all 0.2s ease;

      &:focus {
        outline-width: 10px;
        outline-color: green;
        color: green;
      }
      &:focus::placeholder {
        color: green;
      }
      &::placeholder {
        color: black;
        font-weight: 500;
      }
    }
    .user-data {
      display: flex;
      gap: 2em;
      width: 80%;
      flex-direction: column;

      .new-user-data {
        display: flex;
        gap: 2em;
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
  }
</style>
