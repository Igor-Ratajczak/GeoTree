<template>
  <Transition name="notify">
    <div v-if="state.window.value === 'person_delete'" id="deletePerson" class="message">
      <div class="title">Jesteś pewien?</div>
      <div class="button close" @click="state.window.value = null">Nie czekaj, pomyłka</div>

      <button class="button delete" @click="deletePerson()">Wywalaj z drzewa</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { state } from '../../state'
  import { updateTree } from '../../tree/updateTree'

  /**
   * Delete person from family
   */
  const deletePerson = () => {
    if (state.selectedPersonData.value) {
      new updateTree(state.selectedPersonData.value).delete(state.deletePersonParentId.value)
    }
  }
</script>

<style scoped lang="less">
  .notify-enter-active,
  .notify-leave-active {
    transition: opacity 0.5s ease;
  }

  .notify-enter-from,
  .notify-leave-to {
    opacity: 0;
  }

  .message {
    display: grid;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    height: 200px;
    grid-template: 60px auto / 50% 50%;
    background-color: #353434;
    color: white;
    border-radius: 25px;
    padding: 20px 50px;
    gap: 10px;
    box-shadow: 0 0 100px 10px white;

    .title {
      grid-column: 1/3;
      grid-row: 1/2;
      justify-self: center;
      align-self: center;
      font-size: 2rem;
      font-weight: 900;
    }

    .button {
      background-color: #111111;
      color: white;
      padding: 20px 50px;
      width: max-content;
      border-radius: 25px;
      cursor: pointer;
      justify-self: center;
      align-self: center;
      font-size: 1.5rem;
      font-weight: 900;

      &:hover {
        background-color: #222222;
        transition: all 0.2s ease;
        padding-left: 70px;
        padding-right: 30px;
      }
    }

    .close {
      grid-column: 1;
      grid-row: 2;
    }

    .delete {
      grid-column: 2;
      grid-row: 2;
      border: none;
    }
  }
</style>
