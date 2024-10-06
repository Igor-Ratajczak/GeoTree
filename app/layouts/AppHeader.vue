<template>
  <div class="header">
    <div class="logo">
      <img src="/assets/logo.jpg" alt="logo GenTree" />
      <h1>GenTree</h1>
    </div>
    <div class="searchBar">
      <input type="text" class="search" placeholder="Szukaj ..." />
    </div>

    <div class="menu" ref="menuItems">
      <div class="menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @click="menu = !menu">
          <line x1="0" y1="10" x2="100" y2="10" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="45" x2="100" y2="45" stroke="black" stroke-width="10"></line>
          <line x1="0" y1="80" x2="100" y2="80" stroke="black" stroke-width="10"></line>
        </svg>
      </div>
      <div class="menu-items" v-if="menu" @click="console.log(state.familyTree.value)">
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

  document.body.addEventListener('click', (e: MouseEvent) => {
    if (!menuItems.value?.contains(e.target as Node | null)) menu.value = false
  })
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

      .search {
        width: 60%;
        height: 3em;
        border: none;
        border-radius: 20px;
        padding: 0 10px;
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
