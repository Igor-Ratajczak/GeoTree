interface State {
  active_person: number | null
}

export const state: Ref<State> = ref({
  active_person: null,
})
