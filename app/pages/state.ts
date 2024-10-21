export interface State {
  numberPeople: Ref<number>
  deletePersonParentId: Ref<string | null>
  selectedPersonData: Ref<FamilyNode | null>
  personForm: Ref<PersonForm>
  addOptionPerson: Ref<'parent' | 'child' | null>
  hasParent: Ref<boolean | null>
  AllFamilies: Ref<Array<Family | null>>
  selectedFamily: Ref<number>
  window: Ref<
    | 'person_add'
    | 'person_details'
    | 'person_edit'
    | 'person_delete'
    | 'import'
    | 'export'
    | 'settings'
    | 'about'
    | null
  >
  active_person: Ref<string | null>
  old_active_person: Ref<string | null>
  transform: Ref<{ x: number; y: number; k: number }>
  settings: Ref<
    | [
        {
          name: string
          value: string
        }
      ]
    | null
  >
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
  AllFamilies: ref([
    {
      name: 'test',
      family: {
        id: 'f7c0a496-e445-4f1c-930e-c6153f84359c-1728489705256',
        icon: 'f7c0a496-e445-4f1c-930e-c6153f84359c-1728489705256-photo',
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
          name: 'Kapusta Malczewski',
          birth: '1950',
          death: '1950',
          description:
            'a great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great persona great person',
          userData: [],
        },
        children: [
          {
            id: '305d61c8-27ce-46b0-a193-19e2f35b027c-1728491651735',
            icon: '305d61c8-27ce-46b0-a193-19e2f35b027c-1728491651735-photo',
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
      },
    },
  ]),
  selectedFamily: ref(0),
  window: ref(null),
  active_person: ref(null),
  old_active_person: ref(null),
  transform: ref({ x: 0, y: 0, k: 1 }),
  settings: ref(null),
}
