<template>
  <div class="page_not_found">
    <h1>Nie znaleziono strony!</h1>
    <p>Niestety takiej strony nie ma. Wróć na stronę główną.</p>
    <div class="button"><NuxtLink to="/">Home</NuxtLink></div>
  </div>
</template>

<style scoped lang="less">
  .page_not_found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: linear-gradient(to right, #a2f10e, #02b9c6);
    gap: 2em;

    h1 {
      font-size: 6rem;
    }

    p {
      font-size: 2rem;
    }

    div.button {
      font-size: 2rem;
      border-radius: 15px;
      background-color: #00ff80;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;
      display: grid;
      width: 300px;
      height: 100px;
      place-content: center;
      overflow: hidden;

      &::before {
        content: '';
        display: block;
        background: linear-gradient(
          90deg,
          hsl(50, 100%, 50%) 0%,
          hsl(294, 87%, 43%) 100%
        );
        height: 350px;
        width: 350px;
        position: absolute;
        animation: rotate-f249f6ff 6s linear infinite;
        z-index: 0;
        place-self: center;
      }

      @keyframes rotate {
        to {
          transform: rotate(360deg);
        }
      }

      &:hover {
        transform: scale(1.2);
      }
      a {
        font-size: 2rem;
        text-decoration: none;
        color: black;
        position: relative;
        z-index: 1;
        width: 280px;
        background: #009f3a;
        color: white;
        height: 80px;
        text-align: center;
        border-radius: 15px;
        align-content: center;

        &::before {
          content: '👉';
        }
        &::after {
          content: '👈';
        }
      }
    }
  }
</style>
