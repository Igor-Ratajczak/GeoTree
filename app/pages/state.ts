interface State {
  [x: string]: any
  numberPeople: Ref<number>
  deletePersonParentId: Ref<number | null>
  selectedPersonData: Ref<FamilyNode | null>
  personForm: Ref<PersonForm>
  addOptionPerson: Ref<'parent' | 'child' | null>
  hasParent: Ref<boolean | null>
  familyTree: Ref<FamilyNode | null>
  window: Ref<
    'person_add' | 'person_details' | 'person_edit' | 'person_delete' | null
  >
  active_person: Ref<number | null>
}

export const state: State = {
  numberPeople: ref(2),
  deletePersonParentId: ref(null),
  selectedPersonData: ref(null),
  addOptionPerson: ref(null),
  hasParent: ref(null),
  personForm: ref({
    icon: '',
    name: '',
    birth: null,
    death: null,
    description: '',
    userData: [],
    hasSpouse: false,
    spouse: null,
  }),
  familyTree: ref({
    id: 0,
    icon: '1',
    name: 'Joanna Malczewska',
    birth: '1950',
    death: '1950',
    description:
      'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
    userData: [
      {
        name: 'Nazwisko rodowe',
        text: 'Raciborska',
      },
    ],
    hasSpouse: true,
    spouse: {
      icon: '2',
      name: 'Kapusta Malczewski',
      birth: '1950',
      death: '1950',
      description:
        'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
      userData: [],
    },
    children: [
      {
        id: 1,
        icon: '3',
        name: 'Anna Malczewska',
        birth: '1950',
        death: '1950',
        description:
          'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
        userData: [
          {
            name: 'Nazwisko rodowe',
            text: 'Raciborska',
          },
        ],
        hasSpouse: false,
        spouse: null,
        children: [],
      },
    ],
  }),
  window: ref(null),
  active_person: ref(null),
}
