<template>
  <div class="header">
    <div class="logo">
      <img :src="Logo" alt="logo GenTree" />
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
      <div class="menu-items" v-if="menu">
        <div class="item" @click="setWindow('families')">
          <span>Zrządzanie rodzinami</span>
        </div>
        <div class="item" @click="setWindow('import')">
          <span>Import danych</span>
        </div>
        <div class="item" @click="setWindow('export')">
          <span>Export danych</span>
        </div>
        <div class="item" @click="setWindow('settings')">
          <span>Ustawienia</span>
        </div>
        <div class="item" @click="setWindow('about')"><span>O GenTree</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '/assets/tree.png'
  import SearchBar from './searchBar.vue'

  const { state } = useAppStore()

  const menu = ref(false)
  const menuItems = useTemplateRef('menuItems')

  // close menu when clicked outside
  document.body.addEventListener('click', (e: MouseEvent) => {
    if (!menuItems.value?.contains(e.target as Node | null)) menu.value = false
  })

  const setWindow = (window: WindowTypes) => {
    state.window = window
    menu.value = false
  }
</script>

<style scoped lang="less">
  div.header {
    display: grid;
    align-items: center;
    height: 65px;
    padding-left: 10px;
    grid-template: 100% / auto auto auto;

    @media screen and (min-width: 1500px) {
      grid-template: 100% / auto auto auto 350px;
    }
    @media screen and (min-width: 768px) {
      grid-template: 100% / auto auto auto 150px;
    }
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

        @media screen and (max-width: 350px) {
          display: none;
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
        right: 0;
        background-color: var(--bg_menu);
        min-width: 15em;
        border-radius: 15px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 0 50px var(--clr_menu);
        z-index: 100000;

        @media screen and (min-width: 768px) {
          left: 50%;
          transform: translate(-50%, 0);
        }

        .item {
          color: var(--clr_menu);
          background-color: #00000000;
          padding: 5px;
          border-radius: 25px;
          text-align: center;
          cursor: pointer;
          font-weight: 900;

          &:hover {
            background-color: var(--bg_menu_hover);
          }
        }
      }
    }
  }
</style>
