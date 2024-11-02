<template>
  <Transition name="window">
    <div v-if="state.window === 'settings'" id="userSettings" class="window">
      <div class="title">Ustawienia</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <div class="setting-list" v-for="settings in settingsList" :key="settings.id">
          <div class="setting-title">{{ settings.title }}</div>
          <div class="setting" v-for="setting in settings.data" :key="setting.id">
            <div class="name">{{ setting.name }}:</div>
            <input
              type="color"
              v-model="setting.value"
              @input="updateSettings(settings.id, setting.id)"
            />
            <div class="reset" @click="resetSetting(settings.id, setting.id)">Przywróć kolor</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { settingsList } from '~/composables/useSettings'
  const { state } = useAppStore()

  const updateSettings = (categoryId: SettingsList, settingId: string) => {
    const setting = settingsList[categoryId].data.find((data) => data.id === settingId)
    if (setting) {
      document.body.style.setProperty(`--${settingId}`, setting.value)
    }
  }

  const resetSetting = (categoryId: SettingsList, settingId: string) => {
    const setting = settingsList[categoryId].data.find((data) => data.id === settingId)
    if (setting) {
      setting.value = setting.default
      updateSettings(categoryId, settingId)
    }
  }

  const loadSettings = () => {
    if (state.settings) {
      state.settings.forEach((savedSetting) => {
        const setting = settingsList[savedSetting.id].data.find(
          (data) => data.id === savedSetting.name
        )
        if (setting) setting.value = savedSetting.value
      })
    }

    Object.values(settingsList).forEach((category) => {
      category.data.forEach((setting) => {
        document.body.style.setProperty(`--${setting.id}`, setting.value)
      })
    })
  }

  onMounted(() => {
    loadSettings()
  })
</script>

<style scoped lang="less">
  .content {
    display: flex;
    flex-direction: column;
    gap: 80px;
    overflow-y: auto;
    text-align: center;
    padding-bottom: 5em;
    grid-column: 1/3;

    .setting-list {
      display: grid;
      gap: 2em;

      .setting-title {
        font-size: calc(var(font-size) + 10px);
        font-weight: 900;
      }

      .setting {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2em;
        padding: 0 3em 0 3em;
        align-items: center;
        height: calc(100% + 50px);

        @media screen and (max-width: 500px) {
          grid-template: 1fr 1fr 1fr / 100%;
          justify-items: center;
        }

        input {
          width: 50px;
          height: 50px;
          accent-color: green;
          border-radius: 25px;
          border: none;
          outline: 5px solid black;
          cursor: pointer;
        }

        .reset {
          width: max-content;
          padding: 10px;
          height: max-content;
          border-radius: 15px;
          border: 5px solid red;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: red;
          }
        }
      }
    }
  }
</style>
