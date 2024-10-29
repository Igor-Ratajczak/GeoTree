<template>
  <div id="tree-container" ref="containerRef">
    <svg ref="svgRef">
      <g ref="gRef">
        <g>
          <Transition>
            <TreeLinks v-if="treeData" :node="treeData" />
          </Transition>
          <Transition>
            <TreeCreatePerson v-if="treeData" :node="treeData" />
          </Transition>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'

  const { state } = useAppStore()

  const containerRef = useTemplateRef('containerRef')
  const svgRef = useTemplateRef('svgRef')
  const gRef = useTemplateRef('gRef')
  const treeData = ref<d3.HierarchyNode<FamilyNode> | null>(null)

  const setTree = () => {
    const family = state.AllFamilies[useFamily.getIndex()]?.family
    if (family) TreeInstance.initializeTree(containerRef, svgRef, gRef, treeData, family)
    else treeData.value = null
  }

  // watch for update tree
  watch(
    () => [state.selectedFamily, state.AllFamilies],
    () => {
      setTree()
    },
    {
      deep: true,
    }
  )

  // create tree on mounted
  onMounted(() => {
    setTree()
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
    height: calc(100vh - 130px);
    width: 100%;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
