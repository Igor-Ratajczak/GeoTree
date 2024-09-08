interface State {
  window: 'person_add' | 'person_details' | 'person_edit' | null
  active_person: number | null
}

export const state: Ref<State> = ref({
  window: null,
  active_person: null,
})
