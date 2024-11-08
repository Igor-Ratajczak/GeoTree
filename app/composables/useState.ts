export interface State {
    deletePersonParentId: string | null
    selectedPersonData: FamilyNode | null
    personForm: PersonForm
    addOptionPerson: 'parent' | 'child' | null
    hasParent: boolean | null
    AllFamilies: Array<Family | null>
    selectedFamily: string
    window: WindowTypes
    active_person: string | null
    old_active_person: string | null
    transform: { x: number; y: number; k: number }
    settings:
        | [
        {
            id: SettingsList
            name: Setting
            value: string
        }
    ]
        | null
}

const LS = localStorage.getItem('state')
const stateLS = LS ? JSON.parse(LS) as State : null

const state = reactive<State>({
    deletePersonParentId: stateLS ? stateLS.deletePersonParentId : null,
    selectedPersonData: stateLS ? stateLS.selectedPersonData : null,
    addOptionPerson: stateLS ? stateLS.addOptionPerson : null,
    hasParent: stateLS ? stateLS.hasParent : null,
    personForm: stateLS ? stateLS.personForm : {
        icon: '',
        name: '',
        birth: null,
        death: null,
        description: '',
        userData: [],
        hasSpouse: false,
        spouse:
            {
                icon: '',
                name: '',
                birth: '',
                death: '',
                description: '',
                userData: [],
            }
    },
    AllFamilies: stateLS ? stateLS.AllFamilies : [
        {
            name: 'tanki online gra wieloosobowa',
            id: 'f7c0a496-e445-4f1c-930e',
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
    ],
    selectedFamily: stateLS ? stateLS.selectedFamily : 'f7c0a496-e445-4f1c-930e',
    window: stateLS ? stateLS.window : null,
    active_person: stateLS ? stateLS.active_person : null,
    old_active_person: stateLS ? stateLS.old_active_person : null,
    transform: stateLS ? stateLS.transform : {x: 0, y: 0, k: 1},
    settings: stateLS ? stateLS.settings : null,
})

export const useAppStore = () => {
    return {state}
}

watch(() => useAppStore().state, (state) => {
    localStorage.setItem('state', JSON.stringify(state))
}, {deep: true})