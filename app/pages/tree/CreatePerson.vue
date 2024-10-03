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
        fill="white"
        :class="{ active: state.active_person.value === node.data.id }"
        @click="state.active_person.value = node.data.id"
      ></rect>

      <!-- Person option menu -->
      <Transition name="fade">
        <PersonOption
          v-if="state.active_person.value === node.data.id"
          :rectX="rectX"
          :rectWidth="rectWidth"
          :rectHeight="rectHeight"
          :node="node"
        />
      </Transition>

      <image
        :xlink:href="icon.person"
        :x="rectX + 10"
        y="15"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        @click="state.active_person.value = node.data.id"
      />
      <image
        v-if="node.data.spouse"
        :xlink:href="icon.spouse"
        :x="rectX + 310"
        y="15"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        @click="state.active_person.value = node.data.id"
      />
      <!-- Add person text name, about, and spouse -->
      <AddText :x="rectX" :node="node"></AddText>
    </g>
    <!-- Recursively render child nodes -->
    <CreatePerson
      v-for="child in node.children || []"
      :key="child.data.id"
      :node="child"
    />
  </g>
</template>

<script setup lang="ts">
  import PersonOption from './PersonOption.vue'
  import AddText from './AddText.vue'
  import { state } from '../state'
  import { get } from './idb/manageIDB'

  // Define the props the component will receive
  const props = defineProps<{
    node: D3HierarchyPointNode<FamilyNode>
  }>()

  // Rectangle dimensions
  const rectWidth = computed(() => (props.node.data.spouse ? 650 : 400))
  const rectHeight = 150
  const rectX = computed(() => -rectWidth.value / 5)

  const icon = ref({
    person: '',
    spouse: '',
  })

  get(props.node.data.id).then((res: Icon) => {
    icon.value = res
  })
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

      &.active {
        stroke: red;
        stroke-width: 10;
      }

      &:hover {
        fill: #a2f10e;
      }
    }
    image {
      width: 120px;
      height: 120px;
      clip-path: circle(50%);
    }
    &:has(text.text:hover) > rect,
    &:has(image:hover) > rect {
      fill: #a2f10e;
    }
  }
</style>
