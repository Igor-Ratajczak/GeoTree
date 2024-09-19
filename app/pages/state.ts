interface State {
  numberPeople: number
  selectedPersonData: FamilyNode | null
  familyTree: FamilyNode
  window: 'person_add' | 'person_details' | 'person_edit' | null
  active_person: number | null
}

export const state = reactive<State>({
  numberPeople: 1,
  selectedPersonData: null,
  familyTree: {
    id: 1,
    name: 'Joanna Malczewska',
    birth: 1950,
    death: 1950,
    description:
      'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
    userData: [
      {
        name: 'Nazwisko rodowe',
        text: 'Raciborska',
      },
    ],
    spouse: {
      name: 'Kapusta Malczewski',
      birth: 1950,
      death: 1950,
      description:
        'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
      userData: [],
    },
    children: [],
  },
  window: null,
  active_person: null,
})
