<template>
  <Transition name="window">
    <div v-if="state.window === 'about'" id="aboutSite" class="window">
      <div class="title">O GenTree</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <p><b>GenTree</b> to platforma internetowa, która umożliwia tworzenie, zarządzanie i personalizację drzew genealogicznych. Dzięki tej stronie można stworzyć kompleksowe genealogie bez ograniczeń co do liczby rodzin i ich gałęzi.</p>
        <br>
        <ul>
          <li class="highlight">Kluczowe funkcje:</li>
            <li><b>Nieograniczona liczba drzew genealogicznych:</b> Możliwość tworzenia i zarządzania wieloma drzewami genealogicznymi, co jest idealne dla osób badających różne linie rodzinne.</li>
            <li><b>Intuicyjny interfejs:</b>  Prosty i wygodny interfejs ułatwia dodawanie nowych członków rodziny, śledzenie ich powiązań oraz przeglądanie całej genealogii.</li>
            <li><b>Personalizacja kolorów:</b>  Jeśli nie odpowiadają domyślne kolory wykorzystywane w drzewie genealogicznym, można je łatwo dostosować w ustawieniach. Możliwość zmiany kolorystyki drzew pozwala na pełną personalizację.</li>
            <li><b>Wyszukiwanie i filtry:</b>  Zaawansowane opcje wyszukiwania i filtrowania pozwalają szybko znaleźć konkretne osoby i powiązania w rozbudowanych drzewach genealogicznych.</li>
            <li><b>Udostępnianie i współpraca:</b>  Można zaprosić innych członków rodziny do współtworzenia drzewa, co ułatwia wspólne gromadzenie informacji i uzupełnianie genealogii.</li></ul>
        <p>Wersja: 1.0.0</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()
</script>

<style scoped lang="less">
  .content {
    grid-column: 1/3;
    height: 100%;
    padding: 10px;
    font-size: max(1rem, 20px, 1em);
    user-select: text;
    overflow-y: scroll;

    p {
      text-align: center;
    }
    ul {
      list-style-type: disc;
      padding-left: 20px;

      .highlight {
        font-weight: bold;
        font-size: max(1.1rem, 25px, 1.1em);
        list-style: none; /* Jeśli nie chcesz, aby pojawił się punktor */
      }
    }
  }
</style>
