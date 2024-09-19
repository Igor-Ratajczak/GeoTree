<template>
  <div class="details">
    <div class="name">{{ data?.name }}</div>
    <div class="birth">ur. {{ data?.birth }}</div>
    <div class="death">zm. {{ data?.death }}</div>
    <div class="description">{{ data?.description }}</div>
    <div class="user-data" v-if="data?.userData" v-for="data in data?.userData">
      <div class="name">{{ data?.name }}:</div>
      <div class="text">{{ data?.text }}</div>
    </div>
    <div class="spouse" v-if="data?.spouse">
      <div class="text">Współmałżonek</div>
      <div class="name">{{ data?.spouse.name }}</div>
      <div class="birth">ur. {{ data?.spouse.birth }}</div>
      <div class="death">zm. {{ data?.spouse.death }}</div>
      <div class="description">{{ data?.spouse.description }}</div>
      <div
        class="user-data"
        v-if="data?.spouse.userData"
        v-for="data in data?.spouse.userData"
      >
        <div class="name">{{ data?.name }}:</div>
        <div class="text">{{ data?.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../state'

  const data = ref(state.selectedPersonData)
</script>

<style scoped lang="less">
  .details {
    display: grid;
    gap: 30px;
    grid-column: 1/3;
    justify-items: center;
    border-top: 2px solid black;
    padding-top: 2em;
    padding-bottom: 2em;
    overflow: auto;

    .name {
      font-size: 2.5rem;
      font-weight: 900;
    }

    .birth {
      font-size: 1.5rem;
      font-weight: 900;
    }

    .death {
      font-size: 1.5rem;
      font-weight: 900;
    }

    .description {
      font-size: 1.5rem;
      font-weight: 900;
      padding: 2em;
      text-align: center;
    }

    .user-data {
      display: flex;
      gap: 2em;

      .name {
        font-size: 1.5rem;
        font-weight: 900;
      }

      .text {
        font-size: 1.5rem;
        font-weight: 900;
      }
    }

    .spouse {
      display: grid;
      justify-items: center;
      gap: 30px;
      border-top: 2px solid black;
      padding-top: 2em;

      .text {
        font-size: 1.5rem;
        font-weight: 900;
        border-bottom: 2px solid black;
      }

      .user-data {
        display: flex;
        gap: 2em;

        .name {
          font-size: 1.5rem;
          font-weight: 900;
        }

        .text {
          font-size: 1.5rem;
          font-weight: 900;
          border: none;
        }
      }
    }
  }
</style>
