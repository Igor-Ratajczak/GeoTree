<template>
  <div class="searchBar" :class="{ active_mobile: activeMobile }">
    <input
      type="text"
      class="search"
      v-model="search"
      placeholder="Szukaj ..."
      @input="onSearch()"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      @click="activeMobile = !activeMobile"
    >
      <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
      <path
        v-if="!activeMobile"
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      />
      <line
        :x1="activeMobile ? '0' : '368'"
        :y1="activeMobile ? '0' : '368'"
        :x2="activeMobile ? '512' : '568'"
        :y2="activeMobile ? '512' : '568'"
        stroke-width="90"
      ></line>
      <line
        :x1="activeMobile ? '512' : '368'"
        :y1="activeMobile ? '0' : '368'"
        :x2="activeMobile ? '0' : '568'"
        :y2="activeMobile ? '512' : '568'"
        stroke-width="90"
      ></line>
    </svg>
    <div class="hint" :class="{ active: search.length > 0 }">
      <div
        class="person"
        :class="{ active: activeHint === person.id }"
        v-for="person in searchedPeople"
        @click="selectPerson(person)"
      >
        {{ console.log(activeHint, person.id) }}
        {{ person.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const search: Ref<string> = ref('')
  const searchedPeople: Ref<Array<FamilyNode>> = ref([])
  const activeHint = ref<string | null>(null)
  const activeMobile = ref(false)

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (searchedPeople.value.length === 0) return

    if (e.key === 'ArrowDown') {
      let updated = false
      searchedPeople.value.some((person, index) => {
        if (person)
          if (person.id === activeHint.value) {
            activeHint.value = searchedPeople.value[index + 1]
              ? searchedPeople.value[index + 1]!.id
              : searchedPeople.value[0]!.id
            updated = true
            return true
          }
        return false
      })
      if (!updated) activeHint.value = searchedPeople.value[0]!.id
    }
    if (e.key === 'ArrowUp') {
      let updated = false
      searchedPeople.value.some((person, index) => {
        if (person)
          if (person.id === activeHint.value) {
            activeHint.value = searchedPeople.value[index - 1]
              ? searchedPeople.value[index - 1]!.id
              : searchedPeople.value[searchedPeople.value.length - 1]!.id
            updated = true
            return true
          }
        return false
      })
      if (!updated) activeHint.value = searchedPeople.value[searchedPeople.value.length - 1]!.id
    }

    if (e.key === 'Enter') {
      selectPerson(searchedPeople.value.find((person) => person.id === activeHint.value)!)
    }
  })

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
    display: flex;
    height: 100%;
    position: relative;
    justify-content: center;
    transition: all 0.5s ease;
    gap: 2em;

    &.active_mobile {
      position: absolute;
      width: 100vw !important;
      z-index: 100;
      background-color: var(--bg_main);

      & .search {
        display: block;
        opacity: 1;
      }

      & svg > line {
        stroke: var(--clr_main);
      }
    }

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
      fill: var(--clr_main);

      @media screen and (min-width: 768px) {
        display: none;
      }
    }

    .search {
      width: 60%;
      height: 3em;
      border: none;
      border-radius: 20px 20px 0 0px;
      padding: 0 10px;
      background-color: var(--bg_input_search);
      color: var(--clr_input_search);
      display: none;
      opacity: 0;
      transition: all 0.5s ease;

      @media screen and (min-width: 768px) {
        opacity: 1;
        display: block;
        width: 100%;
      }

      &:focus {
        border: 5px solid green;
        border-bottom: none;
      }
      &:not(:focus) ~ .hint {
        display: none;
      }
    }

    .hint {
      position: absolute;
      top: calc(100% - (100% - 3em - 5px));
      display: none;
      width: 100%;
      height: max-content;
      border-radius: 0 0 20px 20px;
      border: 5px solid black;
      border-top: none;
      z-index: 10;

      @media screen and (max-width: 768px) {
        border-top: 5px solid black;
        border-radius: 0;
        width: 100%;

        .person {
          border-radius: 0 !important;
        }
      }

      &.active {
        display: grid;
      }

      .person {
        display: flex;
        align-items: center;
        font-size: calc(var(--font-size) - 15px);
        font-weight: 900;
        padding: 0 10px;
        cursor: pointer;
        height: 2em;
        background-color: var(--bg_search_hint);
        color: var(--clr_search_hint);
        transition: all 0.5s ease;
        border-bottom: 2px solid black;

        &.active {
          background-color: var(--bg_search_hint_hover);
          color: var(--clr_search_hint_hover);
        }

        &:hover {
          background-color: var(--bg_search_hint_hover);
          color: var(--clr_search_hint_hover);
        }
        &:is(:last-child) {
          border-radius: 0 0 20px 20px;
        }
      }
    }
  }
</style>
