<template>
  <div class="edit">
    <input
      type="text"
      class="name"
      v-model="name"
      placeholder="Imię i Nazwisko"
    />
    <input type="text" class="birth" v-model="birth" placeholder="ur." />
    <input type="text" class="death" v-model="death" placeholder="zm." />
    <textarea type="text" class="description">{{ description }}</textarea>

    <div class="user-data" v-if="userData" v-for="data in userData">
      <input type="text" class="name" :value="data?.name" />
      <input type="text" class="text" :value="data?.text" />
    </div>
    <div class="spouse" v-if="data?.spouse">
      <div class="text">Współmałżonek</div>
      <input type="text" class="name" v-model="spouseName" />
      <input type="text" class="birth" v-model="spouseBirth" />
      <input type="text" class="death" v-model="spouseDeath" />
      <textarea type="text" class="description">{{
        spouseDescription
      }}</textarea>
      <div
        class="user-data"
        v-if="SpouseUserData"
        v-for="data in SpouseUserData"
      >
        <input type="text" class="name" :value="data?.name" />
        <input type="text" class="text" :value="data?.text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../state'
  const data = state.selectedPersonData

  const name = data?.name
  const birth = data?.birth
  const death = data?.death
  const description = data?.description
  const userData = data?.userData
  const spouseName = data?.spouse?.name
  const spouseBirth = data?.spouse?.birth
  const spouseDeath = data?.spouse?.death
  const spouseDescription = data?.spouse?.description
  const SpouseUserData = data?.spouse?.userData
</script>

<style scoped lang="less">
  .edit {
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
  }
</style>
