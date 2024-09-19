<template>
  <div id="tree-container" ref="containerRef">
    <svg ref="svgRef">
      <g ref="gRef">
        <Transition>
          <TreeLinks v-if="treeData" :node="treeData" />
        </Transition>
        <Transition>
          <TreeNode v-if="treeData" :node="treeData" />
        </Transition>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { hierarchy, tree } from 'd3-hierarchy'
  import TreeLinks from './TreeLinks.vue'
  import TreeNode from './TreeNode.vue'
  import { state } from '../state'
  import { useTemplateRef } from 'vue'

  const containerRef = useTemplateRef('containerRef')
  const svgRef = useTemplateRef('svgRef')
  const gRef = useTemplateRef('gRef')
  const treeData = ref<d3.HierarchyPointNode<FamilyNode> | null>(null)

  const createTree = (family: FamilyNode) => {
    const width = containerRef.value!.clientWidth
    const height = containerRef.value!.clientHeight

    // Calculate the tree layout
    const root = hierarchy(family)
    const treeLayout = tree<FamilyNode>()
      .size([width, height])
      .nodeSize([700, 350])
    treeLayout.separation((a, b) => (a.parent === b.parent ? 1 : 1.2))

    treeLayout(root)

    // Assign the processed data to the reactive treeData variable
    treeData.value = root

    // Setup D3 zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
      d3.select(gRef.value!).attr('transform', e.transform)
    })

    if (!gRef.value?.hasAttribute('transform')) {
      d3.select(svgRef.value!)
        .call(zoom)
        .call(
          zoom.transform as any,
          d3.zoomIdentity.scale(1).translate(width / 2, height / 4)
        )
    }
  }

  watch(
    () => state.familyTree,
    (newTree) => {
      createTree(newTree)
    },
    { deep: true }
  )
  onMounted(() => {
    const family = state.familyTree
    createTree(family)
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
