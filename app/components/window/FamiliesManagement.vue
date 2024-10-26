<template>
  <Transition name="window">
    <div v-if="state.window === 'families'" id="manage_families" class="window">
      <div class="title" @click="console.log(state.AllFamilies)">Zarządzanie rodzinami</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <div class="button" id="addFamily" @click="addFamily">+ Nowa rodzina</div>
        <div v-for="family in state.AllFamilies" :key="family?.id" class="family">
          <div
            class="select"
            :class="state.selectedFamily === family?.id ? 'active' : null"
            @click="setFamily(family!.id)"
          ></div>
          <div class="name">
            <p v-if="inputName !== family?.id">
              {{ family!.name.length > 12 ? family!.name.slice(0, 12) + '...' : family!.name }}
            </p>
            <input
              v-if="inputName === family?.id"
              type="text"
              name="name"
              :id="`family_${family?.id}_name`"
              placeholder="Nazwa rodziny"
              :value="family?.name"
            />
          </div>
          <div
            class="edit button"
            @click="inputName === family?.id ? saveFamilyName(family!) : changeName(family!.id)"
          >
            <span v-if="inputName !== family?.id">✏️</span>
            <span v-if="inputName === family?.id">✅</span>
          </div>
          <div class="delete button" @click="deleteFamily(family!.id)">
            <span>❌</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const inputName: Ref<string | null> = ref(null)
  const addFamily = () => {
    const id = uuid()
    state.AllFamilies.push({
      id: id,
      family: null,
      name: `Rodzina ${state.AllFamilies.length + 1}`,
    })
    inputName.value = id
  }

  const setFamily = (id: string) => {
    state.selectedFamily = id
  }

  /**
   * Change name of selected family
   */
  const changeName = (id: string) => {
    inputName.value = id || null
  }

  /**
   * Save family name
   */
  const saveFamilyName = (family: Family) => {
    inputName.value = null
    family.name = (document.getElementById(`family_${family.id}_name`) as HTMLInputElement)?.value
  }

  const deleteFamily = (id: string) => {
    state.AllFamilies = state.AllFamilies.filter((family) => family?.id !== id)
  }
</script>

<style scoped lang="less">
  #manage_families {
    background-color: #000;
    color: white;

    .title {
      border-color: white;
    }

    .content {
      padding: 10px;
      font-size: max(1.5rem, 50px, 1em);
      user-select: text;
      grid-column: 1/3;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      overflow-y: auto;

      #addFamily {
        background-color: hsl(120, 78%, 39%);
        grid-row: 1;
        display: grid;
        place-items: center;
        transition: all 0.5s ease;

        &:hover {
          background-color: hsl(120, 90%, 69%);
          color: black;
          width: 100%;
        }
      }

      .family {
        grid-row: 2;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr 1fr;
        align-items: center;
        width: 80%;
        height: 2em;
        gap: 10px;
        padding: 10px;
        background-color: #333;
        color: white;
        fill: white;
        border-radius: 15px;

        .select {
          width: 40px;
          height: 40px;
          border-radius: 25px;
          border: 2px solid rgb(0, 255, 213);
          background-color: grey;
          cursor: pointer;
          transition: all 0.5s ease;

          &.active {
            background-color: green;
          }
          &:not(.active):hover {
            background-color: lightgreen;
          }
        }
        input {
          width: 90%;
          height: 2em;
          border: none;
          outline: none;
          font-size: 1.5rem;
          font-weight: 900;
          border-radius: 5px;
        }
        .button {
          width: 60px;
          height: 60px;
          display: grid;
          justify-items: center;
          align-items: center;
          outline-color: green;
        }
      }
    }
  }
</style>
