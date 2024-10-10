<template>
  <div class="management_person">
    <img :src="icon" alt="person" />
    <div class="upload-file">
      <button @click="input?.click()">{{ text }}</button>
      <input
        ref="photo"
        type="file"
        name="photo"
        id="photo"
        accept=".jpg, .jpeg, .png"
        @change="onFileChange"
      />
    </div>
    <input type="text" class="name" placeholder="Imię i Nazwisko" v-model="name" />
    <input type="text" class="birth" placeholder="ur." v-model="birth" />
    <input type="text" class="death" placeholder="zm." v-model="death" />
    <textarea class="description" placeholder="opis" v-model="description"></textarea>
    <div class="user-data">
      <div v-for="(item, index) in userData" :key="index" class="new-user-data">
        <input type="text" placeholder="Nazwa" v-model="item.name" />
        <input type="text" placeholder="tekst" v-model="item.text" />
      </div>
    </div>
    <button @click="addInput">Dodaj nowe pole</button>
  </div>
</template>

<script setup lang="ts">
  import { state } from '../state'
  import { watch } from 'vue'
  import defaultUserIcon from '/assets/defaultUserIcon.svg'

  const input = useTemplateRef('photo')
  const text = ref('Wybierz plik.')

  const props = defineProps<{
    type: 'person' | 'spouse'
    option: string
  }>()

  const selectedPersonData = state.selectedPersonData

  const data = props.type === 'spouse' ? selectedPersonData.value?.spouse : selectedPersonData.value

  const dataIcon = props.type === 'spouse' ? state.personForm.value?.spouse : state.personForm.value

  // TODO: change '' to default icon from fontawesome
  const icon = ref(props.option === 'edit' ? dataIcon?.icon : defaultUserIcon)
  const name = ref(props.option === 'edit' ? data?.name : '')
  const birth = ref(props.option === 'edit' ? data?.birth : null)
  const death = ref(props.option === 'edit' ? data?.death : null)
  const description = ref(props.option === 'edit' ? data?.description : '')
  const userData = ref(props.option === 'edit' ? data?.userData : [])

  const addInput = () => {
    userData.value?.push({ name: '', text: '' })
  }

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    text.value = file.name
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      icon.value = e.target?.result as string
    }
  }

  watch(
    () => state.selectedPersonData,
    (newValue: Ref<FamilyNode | null>) => {
      if (newValue.value) {
        name.value = newValue.value.name
        birth.value = newValue.value.birth
        death.value = newValue.value.death
        description.value = newValue.value.description
        userData.value = newValue.value.userData
      }
    },
    { deep: true }
  )

  watch(
    [icon, name, birth, death, description, userData],
    (newValue) => {
      console.log(state.personForm.value.hasSpouse)

      if (props.type === 'person') {
        state.personForm.value = {
          icon: newValue[0] || '',
          name: newValue[1] || '',
          birth: newValue[2] || null,
          death: newValue[3] || null,
          description: newValue[4] || '',
          userData: newValue[5] as UserData[],
          hasSpouse: state.personForm.value.hasSpouse,
          spouse: state.personForm.value.spouse,
        }
      }
      if (props.type === 'spouse') {
        state.personForm.value.spouse = {
          icon: newValue[0] || '',
          name: newValue[1] || '',
          birth: newValue[2] || null,
          death: newValue[3] || null,
          description: newValue[4] || '',
          userData: newValue[5] as UserData[],
        }
      }
    },
    { deep: true }
  )
</script>
