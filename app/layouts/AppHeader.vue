<template>
  <div class="header">
    <div class="logo">
      <img src="/assets/logo.jpg" alt="logo GenTree" />
      <h1>GenTree</h1>
    </div>
    <div class="searchBar">
      <input type="text" class="search" placeholder="Szukaj ..." />
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
    grid-template: 100% / 30% 70%;

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
  }
</style>
