<template>
  <div class="header">
    <div class="logo">
      <img src="/assets/logo.jpg" alt="logo GenTree" />
      <h1>GenTree</h1>
    </div>
    <div class="searchBar">
      <input
        type="text"
        class="search"
        v-model="search"
        placeholder="Szukaj ..."
        @input="onSearch()"
      />
      <div class="hint" :class="{ active: search.length > 0 }">
        <div class="person" v-for="person in searchedPeople" @click="selectPerson(person)">
          {{ person.name }}
        </div>
      </div>
    </div>

    <div class="menu" ref="menuItems">
      <div class="menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @click="menu = !menu">
          <line x1="0" y1="10" x2="100" y2="10" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="45" x2="100" y2="45" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="80" x2="100" y2="80" stroke="black" stroke-width="10"></line>
        </svg>
      </div>
      <div class="menu-items" v-if="menu">
        <div class="item" @click="state.window.value = 'import'">Import danych</div>
        <div class="item" @click="state.window.value = 'export'">Export danych</div>
        <div class="item" @click="state.window.value = 'settings'">Ustawienia</div>
        <div class="item" @click="state.window.value = 'about'">O GenTree</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../pages/state.js'
  const menu = ref(false)
  const menuItems: Ref<null | HTMLDivElement> = ref(null)
  const search: Ref<string> = ref('')
  const searchedPeople: Ref<Array<FamilyNode>> = ref([])

  document.body.addEventListener('click', (e: MouseEvent) => {
    if (!menuItems.value?.contains(e.target as Node | null)) menu.value = false
  })

  const onSearch = () => {
    searchedPeople.value = []
    filterFamily(state.AllFamilies.value[state.selectedFamily.value]?.family!)
  }
  const filterFamily = (data: FamilyNode) => {
    if (data) {
      const words = search.value
        .toUpperCase()
        .split(' ')
        .filter((word) => word)
      const matchesAllWords = words.every((word) => {
        return (
          data.name.toUpperCase().includes(word) ||
          data.birth?.toUpperCase().includes(word) ||
          data.death?.toUpperCase().includes(word) ||
          data.description?.toUpperCase().includes(word) ||
          data.userData?.some((data) => data.text.toUpperCase().includes(word)) ||
          data.spouse?.name?.toUpperCase().includes(word) ||
          data.spouse?.birth?.toUpperCase().includes(word) ||
          data.spouse?.death?.toUpperCase().includes(word) ||
          data.spouse?.description?.toUpperCase().includes(word) ||
          data.spouse?.userData?.some((data) => data.text.toUpperCase().includes(word))
        )
      })
      if (matchesAllWords && !searchedPeople.value.includes(data)) {
        searchedPeople.value.push(data)
      }
      data.children?.forEach((child) => {
        filterFamily(child)
      })
    }
  }

  const selectPerson = (person: FamilyNode) => {
    state.old_active_person.value = state.active_person.value
    state.active_person.value = person.id
    searchedPeople.value = []
    search.value = ''
  }
</script>

<style scoped lang="less">
  div.header {
    display: grid;
    align-items: center;
    height: 65px;
    background-color: #a2f10e;
    padding-left: 10px;
    grid-template: 100% / 30% 60% 10%;

    .logo {
      display: flex;
      height: 100%;

      img {
        width: 65px;
        height: 65px;
        padding: 5px;
        object-fit: cover;
        border-radius: 50%;
      }

      h1 {
        height: 100%;
        align-content: center;
      }
    }
    .searchBar {
      align-items: center;
      display: grid;
      height: 100%;
      position: relative;

      .search {
        width: 60%;
        height: 3em;
        border: none;
        border-radius: 20px 20px 0 0px;
        padding: 0 10px;

        &:focus {
          border: 5px solid green;
          border-bottom: none;
        }
      }

      .hint {
        position: absolute;
        top: calc(100% - (100% - 3em - 5px));
        display: none;
        width: 60%;
        height: max-content;
        border-radius: 0 0 20px 20px;
        border: 5px solid black;
        border-top: none;
        z-index: 10;

        &.active {
          display: grid;
        }

        .person {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 900;
          padding: 0 10px;
          cursor: pointer;
          height: 2em;
          background-color: rgba(243, 240, 240, 0.849);
          transition: all 0.5s ease;
          border-bottom: 2px solid black;

          &:hover {
            background-color: rgb(25, 245, 25);
          }
          &:is(:last-child) {
            border-radius: 0 0 20px 20px;
          }
        }
      }
    }
    .menu {
      position: relative;
      height: 100%;

      .menu-button {
        align-items: center;
        justify-content: center;
        display: grid;
        height: 100%;
        width: 100%;

        > svg {
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
      }
      .menu-items {
        position: absolute;
        top: 100%;
        left: -100%;
        transform: translate(10%, 0%);
        background-color: rgba(0, 0, 0, 0.809);
        width: 150%;
        border-radius: 15px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .item {
          background-color: rgb(72, 72, 72);
          color: white;
          padding: 5px;
          border-radius: 25px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background-color: rgb(116, 116, 116);
          }
        }
      }
    }
  }
</style>
