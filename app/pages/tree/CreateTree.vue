<template>
  <div id="tree-container" ref="containerRef">
    <svg ref="svgRef">
      <g ref="gRef">
        <g>
          <Transition>
            <TreeLinks v-if="treeData" :node="treeData" />
          </Transition>
          <Transition>
            <CreatePerson v-if="treeData" :node="treeData" />
          </Transition>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { hierarchy, tree } from 'd3-hierarchy'
  import TreeLinks from './TreeLinks.vue'
  import CreatePerson from './CreatePerson.vue'
  import { state } from '../state'
  import { useTemplateRef } from 'vue'

  const containerRef = useTemplateRef('containerRef')
  const svgRef = useTemplateRef('svgRef')
  const gRef = useTemplateRef('gRef')
  const treeData = ref<d3.HierarchyNode<FamilyNode> | null>(null)

  // function to create tree
  const createTree = (family: FamilyNode) => {
    // get width and height of container
    const width = containerRef.value!.clientWidth
    const height = containerRef.value!.clientHeight

    // calculate tree layout
    const root = hierarchy(family)
    const treeLayout = tree<FamilyNode>().size([width, height]).nodeSize([700, 350])
    treeLayout.separation((a, b) => (a.parent === b.parent ? 1 : 1.2))

    treeLayout(root)

    // assign data to reactive treeData variable
    treeData.value = root

    // set up D3 zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
      state.transform.value = { x: e.transform.x, y: e.transform.y, k: e.transform.k }
      d3.select(gRef.value!).attr(
        'transform',
        `translate(${e.transform.x}, ${e.transform.y}) scale(${e.transform.k})`
      )
    })
    // watch transform and update D3 zoom when the person is selected from input search
    watch(
      state.transform,
      (newVal, oldVal) => {
        if (state.old_active_person.value === state.active_person.value) return

        const animationData = [
          { transform: `translate(${oldVal!.x}px, ${oldVal!.y}px) scale(${oldVal!.k})` },
          { transform: `translate(${newVal!.x}px, ${newVal!.y}px) scale(1)` },
        ]
        const animationTiming = {
          duration: 1000,
          easing: 'ease-in-out',
        }
        // if (newVal2 === oldVal2) return
        const animation = gRef.value!.animate(animationData, animationTiming)

        animation.onfinish = () => {
          const zoom = d3.zoom<SVGSVGElement, unknown>()
          d3.select(svgRef.value!).call(
            zoom.transform as any,
            d3.zoomIdentity.scale(1).translate(newVal.x, newVal.y)
          )
          d3.select(gRef.value!).attr('transform', `translate(${newVal!.x}, ${newVal!.y}) scale(1)`)
          state.old_active_person.value = state.active_person.value
        }
      },
      { deep: true }
    )

    if (!gRef.value?.hasAttribute('transform')) {
      d3.select(svgRef.value!)
        .call(zoom)
        .call(zoom.transform as any, d3.zoomIdentity.scale(1).translate(width / 2, height / 4))
    }
  }

  // watch selected family and create tree if selected family is changed
  watch(
    () => state.selectedFamily.value,
    (newVal) => {
      if (newVal && state.AllFamilies.value[newVal]?.family)
        createTree(state.AllFamilies.value[newVal].family)
      else treeData.value = null
    }
  )

  // watch all families and create tree if selected family is changed
  watch(
    () => state.AllFamilies.value,
    (newVal) => {
      const i = state.selectedFamily.value
      if (newVal && i >= 0 && i < newVal.length && newVal[i] && newVal[i].family)
        createTree(newVal[i].family)
      else treeData.value = null
    },
    { deep: true }
  )

  // create tree on mounted
  onMounted(() => {
    const family = state.AllFamilies.value[state.selectedFamily.value]?.family
    if (family) createTree(family)
    else treeData.value = null
  })
</script>

<style scoped lang="less">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  #tree-container {
    background-color: green;
    height: calc(100vh - 130px);
    width: 100%;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
