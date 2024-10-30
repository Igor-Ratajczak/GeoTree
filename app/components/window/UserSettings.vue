<template>
  <Transition name="window">
    <div v-if="state.window === 'settings'" id="userSettings" class="window">
      <div class="title">Ustawienia</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <div class="setting" v-for="(setting, index) in settings" :key="setting.name">
          <div class="name">{{ setting.name }}</div>
          <input type="color" v-model="setting.value" @input="updateSettings(index)" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  type Setting =
    | 'bg_main'
    | 'clr_main'
    | 'bg_window'
    | 'clr_window'
    | 'bg_input_file_button'
    | 'clr_input_file_button'
    | 'bg_input_file_button_hover'
    | 'clr_input_file_button_hover'
    | 'bg_svg_box'
    | 'clr_svg_box'
    | 'bg_svg_box_hover'
    | 'bg_menu'
    | 'bg_menu_hover'
    | 'clr_menu'

  type Settings = {
    [name in Setting]: {
      name: string
      default: string
      value: string
    }
  }
  const settings: Settings = {
    bg_main: { name: 'Tło', default: '#008000', value: '#008000' },
    clr_main: { name: 'kolor tekstu', default: '#333333', value: '#333333' },
    bg_window: { name: 'Kolor tła okna', default: '#f5f5f5', value: '#f5f5f5' },
    clr_window: { name: 'Kolor tekstu okna', default: '#000000', value: '#000000' },
    bg_input_file_button: { name: 'Kolor przycisku pliku', default: '#008000', value: '#008000' },
    clr_input_file_button: {
      name: 'Kolor tekstu przycisku pliku',
      default: '#ffffff',
      value: '#ffffff',
    },
    bg_input_file_button_hover: {
      name: 'Kolor przycisku pliku po najechaniu',
      default: '#008000',
      value: '#008000',
    },
    clr_input_file_button_hover: {
      name: 'Kolor tekstu przycisku pliku po najechaniu',
      default: '#ffffff',
      value: '#ffffff',
    },
    bg_svg_box: { name: 'Kolor tła osób', default: '#ffffff', value: '#ffffff' },
    clr_svg_box: { name: 'Kolor tekstu osób', default: '#000000', value: '#000000' },
    bg_svg_box_hover: {
      name: 'Kolor tła osób po najechaniu',
      default: '#a2f10e',
      value: '#a2f10e',
    },
    bg_menu: { name: 'Kolor tła menu', default: '#44c708', value: '#44c708' },
    bg_menu_hover: { name: 'Kolor tła menu po najechaniu', default: '#01aa01', value: '#01aa01' },
    clr_menu: { name: 'Kolor tekstu menu', default: '#000000', value: '#000000' },
  }

  const changedSettings: Ref<Setting[]> = ref([])
  const updateSettings = (type: Setting) => {
    let styleData = ''
    if (!changedSettings.value.includes(type)) changedSettings.value.push(type)

    changedSettings.value.forEach((setting) => {
      styleData += '--' + setting + ':' + settings[setting!].value + ';'
    })
    document.body.setAttribute('style', styleData)
  }
</script>
