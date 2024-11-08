<template>
  <g>
    <!-- Node -->
    <g :transform="`translate(${node.x},${node.y})`" class="node">
      <rect
        :width="rectWidth"
        :height="rectHeight"
        :x="rectX"
        rx="10"
        ry="10"
        :class="{ active: state.active_person === node.data.id }"
        @click="state.active_person = node.data.id"
      ></rect>

      <!-- Person option menu -->
      <Transition name="fade">
        <TreePersonOption
          v-if="state.active_person === node.data.id"
          :rectX="rectX"
          :rectWidth="rectWidth"
          :rectHeight="rectHeight"
          :node="node"
        />
      </Transition>

      <image
        :xlink:href="icon === undefined || icon.person === '' ? defaultUserIcon : icon.person"
        :x="rectX + 10"
        y="15"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        @click="state.active_person = node.data.id"
      />
      <image
        v-if="node.data.hasSpouse"
        :xlink:href="icon === undefined || icon.spouse === '' ? defaultUserIcon : icon.spouse"
        :x="rectX + 310"
        y="15"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        @click="state.active_person = node.data.id"
      />
      <!-- Add person text name, about, and spouse -->
      <TreePersonText :x="rectX" :node="node" />
    </g>
    <!-- Recursively render child nodes -->
    <CreatePerson v-for="child in node.children || []" :key="child.data.id" :node="child" />
  </g>
</template>

<script setup lang="ts">
  import defaultUserIcon from '/assets/defaultUserIcon.png'

  const { state } = useAppStore()

  // Define the props the component will receive
  const props = defineProps<{
    node: D3HierarchyNode<FamilyNode>
  }>()

  // Rectangle dimensions
  const rectWidth = computed(() => (props.node.data.hasSpouse ? 650 : 400))
  const rectHeight = 150
  const rectX = computed(() => -rectWidth.value / 5)

  // person icon
  const icon = ref({
    person: defaultUserIcon,
    spouse: defaultUserIcon,
  })

  // get and set person icon
  const setIcon = (id: string) => {
    get(id).then((res: Icon) => {
      icon.value = res
    })
  }
  setIcon(props.node.data.icon)

  // watch if the AllFamilies is changed and update person icons
  watch(() => [state.AllFamilies, state.selectedFamily],
    () => {
      setIcon(props.node.data.icon)
    },
    { deep: true }
  )

  watch(
    () => state.active_person,
    (newVal, oldVal) => {
      if (oldVal === newVal) return
      const node = props.node
      const width = window.innerWidth
      const height = window.innerHeight

      if (newVal === node.data.id) {
        const transform = {
          x: width / 2 - (node.x || 0),
          y: height / 4 - (node.y || 0),
          k: state.transform.k,
        }
        TreeInstance.animateTree(transform)
      }
    }
  )
</script>

<style scoped lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .node {
    cursor: pointer;
    transition: all 0.3s ease;

    > rect {
      stroke: black;
      stroke-width: 5;
      transition: all 0.5s ease;
      fill: var(--bg_svg_box);

      &.active {
        stroke: var(--bg_svg_box_active);
        stroke-width: 10;
      }

      &:hover {
        fill: var(--bg_svg_box_hover);
      }
    }
    image {
      width: 120px;
      height: 120px;
      clip-path: circle(50%);
    }
    &:has(text.text:hover) > rect,
    &:has(image:hover) > rect {
      fill: var(--bg_svg_box_hover);
    }
  }
</style>
