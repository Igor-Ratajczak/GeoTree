<template>
  <div class="searchBar">
    <input
      type="text"
      class="search"
      v-model="search"
      placeholder="Szukaj ..."
      @input="onSearch()"
    />
    <div class="hint" :class="{ active: search.length > 0 }">
      <div class="person" v-for="person in searchedPeople" @click="selectPerson(person)">
        {{ person.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const search: Ref<string> = ref('')
  const searchedPeople: Ref<Array<FamilyNode>> = ref([])

  /**
   * Clears the current search results and filters the family data
   * based on the selected family and the search input.
   */
  const onSearch = () => {
    searchedPeople.value = []
    useFamily.filter(search.value).then((data) => {
      searchedPeople.value = data
    })
  }

  /**
   * Selects a person, sets the old active person, sets the active person to the
   * person's id, clears the search results, and resets the search input.
   * @param {FamilyNode} person - The person to select.
   */
  const selectPerson = (person: FamilyNode) => {
    state.old_active_person = state.active_person
    state.active_person = person.id
    searchedPeople.value = []
    search.value = ''
  }
</script>

<style scoped lang="less">
  .searchBar {
    align-items: center;
    display: grid;
    height: 100%;
    position: relative;

    .search {
      width: 60%;
      height: 3em;
      border: none;
      border-radius: 20px 20px 0 0px;
      padding: 0 10px;

      &:focus {
        border: 5px solid green;
        border-bottom: none;
      }
    }

    .hint {
      position: absolute;
      top: calc(100% - (100% - 3em - 5px));
      display: none;
      width: 60%;
      height: max-content;
      border-radius: 0 0 20px 20px;
      border: 5px solid black;
      border-top: none;
      z-index: 10;

      &.active {
        display: grid;
      }

      .person {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 900;
        padding: 0 10px;
        cursor: pointer;
        height: 2em;
        background-color: rgba(243, 240, 240, 0.849);
        transition: all 0.5s ease;
        border-bottom: 2px solid black;

        &:hover {
          background-color: rgb(25, 245, 25);
        }
        &:is(:last-child) {
          border-radius: 0 0 20px 20px;
        }
      }
    }
  }
</style>
