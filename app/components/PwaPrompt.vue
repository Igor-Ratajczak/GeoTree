<script setup>
const { $pwa } = useNuxtApp()
</script>

<template>
  <Transition name="pwa">
  <div v-if="$pwa.needRefresh" class="pwa-message">
    <span>
      Zaktualizuj stronę do najnowsze wersji.
    </span>

    <button @click="$pwa.updateServiceWorker()">
      Aktualizuj
    </button>
  </div>
  </Transition>
</template>

<style lang="less" scoped>

.pwa-enter-active,
.pwa-leave-active {
  transition: all 1s;
}

.pwa-enter-from,
.pwa-leave-to {
  bottom: -100% !important;
}

.pwa-message {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #ddd;
  text-align: center;
  z-index: 9999;
  font-size: var(--font-size);

  button {
    width: max-content;
    height: max-content;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: var(--font-size);
    background: green;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: 1rem;
    position: relative;

    &::after {
      content: '\21BA';
      font-size: var(--font-size);
    }

    @media (min-width: 1000px) {
      & {
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s;
      }
      &:hover {
        box-shadow: 0 0 10px 10px rgb(40, 207, 3);

      }
    }
  }
}
</style>