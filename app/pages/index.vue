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
  import { ref, onMounted } from 'vue'
  import * as d3 from 'd3'
  import { hierarchy, tree } from 'd3-hierarchy'
  import TreeLinks from './TreeLinks.vue'
  import TreeNode from './TreeNode.vue'

  export type FamilyNode = {
    id: number
    name: string
    birth: number
    death?: number
    about: string
    spouse: string
    spouse_birth?: number
    spouse_death?: number
    children?: FamilyNode[]
  }

  const containerRef = ref<HTMLDivElement | null>(null)
  const svgRef = ref<SVGSVGElement | null>(null)
  const gRef = ref<SVGGElement | null>(null)
  const treeData = ref<d3.HierarchyPointNode<FamilyNode> | null>(null)

  onMounted(() => {
    const family: FamilyNode = {
      id: 1,
      name: 'Joanna Malczewska',
      birth: 1950,
      death: 1950,
      about: 'a great family',
      spouse: 'Kapusta Malczewski',
      spouse_birth: 1950,
      spouse_death: 1950,
      children: [
        {
          id: 2,
          name: 'child #1',
          birth: 1950,
          death: 1950,
          about: 'a great family',
          spouse: 'family?',
          children: [
            {
              id: 3,
              name: 'grandchild #1',
              birth: 1950,
              death: 1950,
              about: 'a great family',
              spouse: 'family?',
              children: [
                {
                  id: 4,
                  name: 'grandchild #3',
                  birth: 1950,
                  death: 1950,
                  about: 'a great family',
                  spouse: 'family?',
                },
              ],
            },
            {
              id: 5,
              name: 'grandchild #2',
              birth: 1950,
              death: 1950,
              about: 'a great family',
              spouse: '',
            },
          ],
        },
        {
          id: 6,
          name: 'child #2',
          birth: 1950,
          death: 1950,
          about: 'a great family',
          spouse: 'family?',
          children: [
            {
              id: 7,
              name: 'grandchild #1',
              birth: 1950,
              death: 1950,
              about: 'a great family',
              spouse: 'family?',
            },
            {
              id: 8,
              name: 'grandchild #2',
              birth: 1950,
              about: 'a great family',
              spouse: 'family?',
            },
            {
              id: 9,
              name: 'grandchild #3',
              birth: 1950,
              about: 'a great family',
              spouse: 'family?',
            },
          ],
        },
      ],
    }

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

    d3.select(svgRef.value!)
      .call(zoom)
      .call(
        zoom.transform as any,
        d3.zoomIdentity.scale(1).translate(width / 2, height / 4)
      )
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
