<template>
  <div class="header">
    <div class="logo">
      <img src="/assets/logo.jpg" alt="logo GenTree" />
      <h1>GenTree</h1>
    </div>
    <SearchBar />

    <div class="menu" ref="menuItems">
      <div class="menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @click="menu = !menu">
          <line x1="0" y1="10" x2="100" y2="10" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="45" x2="100" y2="45" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="80" x2="100" y2="80" stroke="black" stroke-width="10"></line>
        </svg>
      </div>
      <div class="menu-items" v-if="menu" @click="console.log(state.AllFamilies)">
        <div class="item" @click="useAppStore().state.window = 'families'">
          <span>Zrządzanie rodzinami</span>
        </div>
        <div class="item" @click="useAppStore().state.window = 'import'">
          <span>Import danych</span>
        </div>
        <div class="item" @click="useAppStore().state.window = 'export'">
          <span>Export danych</span>
        </div>
        <div class="item" @click="useAppStore().state.window = 'settings'">
          <span>Ustawienia</span>
        </div>
        <div class="item" @click="useAppStore().state.window = 'about'"><span>O GenTree</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SearchBar from './searchBar.vue'

  const { state } = useAppStore()

  const menu = ref(false)
  const menuItems = useTemplateRef('menuItems')

  // close menu when clicked outside
  document.body.addEventListener('click', (e: MouseEvent) => {
    if (!menuItems.value?.contains(e.target as Node | null)) menu.value = false
  })
</script>

<style scoped lang="less">
  div.header {
    display: grid;
    align-items: center;
    height: 65px;
    padding-left: 10px;
    grid-template: 100% / 20em auto 3em 350px;

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
        left: 50%;
        transform: translate(-50%, 0);
        background-color: var(--bg_menu);
        min-width: 15em;
        width: 150%;
        border-radius: 15px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 0 50px var(--clr_menu);

        .item {
          color: var(--clr_menu);
          background-color: #00000000;
          padding: 5px;
          border-radius: 25px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background-color: var(--bg_menu_hover);
          }
        }
      }
    }
  }
</style>
