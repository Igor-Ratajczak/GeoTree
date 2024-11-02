<template>
  <Transition name="notify">
    <div v-if="state.window === 'person_delete'" id="deletePerson" class="message">
      <div class="title">Jesteś pewien?</div>
      <div class="button close" @click="state.window = null">Nie czekaj, pomyłka</div>

      <button class="button delete" @click="deletePerson()">Wywalaj z drzewa</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  /**
   * Delete person from family
   */
  const deletePerson = () => {
    if (state.selectedPersonData) {
      new Person(null, state.selectedPersonData.id).remove(state.deletePersonParentId!)
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
    height: max-content;
    grid-template: calc(var(--font-size_message) + 20px) auto / 50% 50%;
    background-color: #353434;
    color: white;
    border-radius: 25px;
    padding: calc(var(--font-size_message)) calc(var(--font-size_message) + 20px);
    gap: 10px;
    box-shadow: 0 0 100px 10px white;
    --font-size_message: 30px;

    @media screen and (max-width: 850px) {
      --font-size_message: 25px;
    }
    @media screen and (max-width: 650px) {
      --font-size_message: 23px;
    }
    @media screen and (max-width: 600px) {
      --font-size_message: 20px;
    }
    @media screen and (max-width: 500px) {
      --font-size_message: 17px;
    }
    @media screen and (max-width: 400px) {
      display: flex;
      flex-direction: column;
      gap: 2em;
      --font-size_message: 20px;
    }
    @media screen and (max-width: 300px) {
      --font-size_message: 17px;
    }
    .title {
      grid-column: 1/3;
      grid-row: 1/2;
      justify-self: center;
      align-self: center;
      font-size: var(--font-size_message);
      font-weight: 900;
    }

    .button {
      background-color: #111111;
      color: white;
      padding: calc(var(--font-size_message) - 10px) calc(var(--font-size_message) + 20px);
      width: max-content;
      border-radius: 25px;
      cursor: pointer;
      justify-self: center;
      align-self: center;
      font-size: calc(var(--font-size_message) - 10px);
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
