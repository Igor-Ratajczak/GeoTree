<template>
  <Transition name="window">
    <div v-if="state.window === 'settings'" id="userSettings" class="window">
      <div class="title">Ustawienia</div>
      <div class="close" @click="state.window = null">X</div>
      <div class="content">
        <div class="setting" v-for="setting in settings" :key="setting.name">
          <div class="name">{{ setting.name }}</div>
          <input type="color" v-model="setting.value" @input="updateSettings()" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const { state } = useAppStore()

  const settings = {
    background: { name: 'Tło', value: '#008000' },
    color: { name: 'kolor tekstu', value: '#333333' },
  }

  const updateSettings = () => {
    const style = document.body.getAttribute('style')
    document.body.setAttribute(
      'style',
      '--clr-bg:' + settings.background.value + ';' + '--clr-text:' + settings.color.value + ';'
    )
  }
</script>
