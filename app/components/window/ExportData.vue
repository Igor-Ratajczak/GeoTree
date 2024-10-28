<template>
  <Transition name="window">
    <div v-if="state.window === 'export'" id="exportData" class="window">
      <div class="title">Eksportuj dane</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="exports">
        <WindowDataTemplate type="export" text="Eksportuj" :data="data" />
        <!-- <div class="tree_structure">
          <div class="family parent">
            <input
              type="checkbox"
              name="family"
              id="importAllFamilies"
              v-model="importAllFamilies"
              @change="allFamiliesSelected()"
            />
            <label for="family">Eksportuj wszystkie rodziny</label>
            <div class="families child" v-for="(family, index) in state.AllFamilies" :key="index">
              <input
                type="checkbox"
                name="family"
                :id="'family' + index"
                v-model="families[index]"
              />
              <label :for="'family' + index">Eksportuj {{ family?.name }}</label>
            </div>
          </div>
          <div class="settings parent">
            <input type="checkbox" name="importSettings" id="importSettings" v-model="settings" />
            <label for="importSettings">Eksportuj ustawienia</label>
          </div>
        </div> -->
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const data = {
    icons: await getAll(),
    AllFamilies: state.AllFamilies,
    settings: state.settings,
  }
</script>

<style scoped lang="less">
  .exports {
    grid-column: 1/3;
    display: grid;
    grid-template-rows: 1fr 5fr;
    gap: 2em;
    overflow: auto;
    padding: 2em;

    input[type='checkbox'] {
      width: 50px;
      height: 50px;
      accent-color: green;
    }

    label {
      font-size: 1.5rem;
      font-weight: 900;
    }

    .upload-file {
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 1em;
    }

    .tree_structure {
      display: flex;
      flex-direction: column;
      gap: 1em;

      .parent {
        display: grid;
        grid-template: auto auto / auto 1fr;
        gap: 1em;
        margin-left: 2em;
        align-items: center;
        height: max-content;

        input {
          grid-row: 1;
          grid-column: 1;
        }

        label {
          grid-row: 1;
          grid-column: 2;
        }

        .child {
          display: flex;
          grid-column: 2;
          margin-left: 2em;
          gap: 1em;
          align-items: center;
        }
      }
    }

    .remove-actual-data {
      display: flex;
      flex-direction: row;
      gap: 1em;
      justify-content: center;
      align-items: center;
    }
  }
</style>
