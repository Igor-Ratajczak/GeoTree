<template>
  <div class="root">
    <canvas ref="canvas" :width="canvas_width" :height="canvas_height">
    </canvas>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  const canvas_width = ref(0)
  const canvas_height = ref(0)
  const canvas: Ref<null | HTMLCanvasElement> = ref(null)
  let ctx: CanvasRenderingContext2D | null | undefined = null

  onMounted(() => {
    canvas_width.value = window.innerWidth
    canvas_height.value = window.innerHeight - 130

    const isDragging = ref(false)
    const x = ref(window.innerWidth / 2)
    const y = ref((window.innerHeight - 130) / 2)
    const mouseX = ref(0)
    const mouseY = ref(0)
    const scaleX = ref(1)
    const scaleY = ref(1)
    function draw() {
      ctx = canvas.value?.getContext('2d')
      if (ctx) {
        ctx.reset()
        ctx.scale(scaleX.value, scaleY.value)
        ctx.translate(x.value, y.value)
        ctx.clearRect(0, 0, 0, 0)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 100, 100)
        ctx.fillStyle = 'black'
        ctx.font = '48px serif'
        ctx.fillText('Hello world', 100, 100)
      }
    }

    canvas.value?.addEventListener('mousedown', (event) => {
      isDragging.value = true
      mouseX.value = event.clientX
      mouseY.value = event.clientY
    })
    canvas.value?.addEventListener('mousemove', (event) => {
      if (isDragging.value) {
        x.value = x.value + (event.clientX - mouseX.value)
        y.value = y.value + (event.clientY - mouseY.value)

        mouseX.value = event.clientX
        mouseY.value = event.clientY
        draw()
      }
    })
    canvas.value?.addEventListener('mouseup', () => {
      isDragging.value = false
    })
    canvas.value?.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        scaleX.value = scaleX.value + 0.1
        scaleY.value = scaleY.value + 0.1
        x.value += -0.1
        y.value += -0.1
      } else {
        scaleX.value = scaleX.value - 0.1
        scaleY.value = scaleY.value - 0.1
        x.value += 0.1
        y.value += 0.1
      }
      draw()
    })
    draw()
  })
</script>

<style scoped lang="less">
  .root {
    height: calc(100vh - 130px);

    canvas {
      background-color: green;
    }
  }
</style>
