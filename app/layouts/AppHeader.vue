<template>
  <div class="header">
    <div class="logo">
      <img src="/assets/logo.jpg" alt="logo GenTree" />
      <h1>GenTree</h1>
    </div>
    <div class="searchBar">
      <input type="text" class="search" placeholder="Szukaj ..." />
    </div>
    <div class="menu">
      <div class="menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <line
            x1="33"
            y1="0"
            x2="33"
            y2="100"
            stroke="black"
            stroke-width="2"
          ></line>
          <line
            x1="66"
            y1="0"
            x2="66"
            y2="100"
            stroke="black"
            stroke-width="2"
          ></line>
          <line
            x1="99"
            y1="0"
            x2="99"
            y2="100"
            stroke="black"
            stroke-width="2"
          ></line>
        </svg>
      </div>
      <div class="item">Import danych</div>
      <div class="item">Export danych</div>
      <div class="item">Ustawienia</div>
      <div class="item">O GenTree</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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

      .item {
        display: none;
      }
    }
  }
</style>
