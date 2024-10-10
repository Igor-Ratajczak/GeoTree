<template>
  <g>
    <!-- Links -->
    <path
      v-for="link in links"
      :key="link.source.data.name + '-' + link.target.data.name"
      class="link"
      :d="generateLinkPath(link) || undefined"
    ></path
  ></g>
</template>

<script setup lang="ts">
  import type { HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy'
  import * as d3 from 'd3'

  // Define the props the component will receive
  const props = defineProps<{
    node: D3HierarchyNode<FamilyNode>
  }>()

  // Compute the links (connections between nodes)
  const links = computed(() => (props.node.children ? props.node.links() : []))

  // Generate the path for the link using D3's linkVertical function
  const generateLinkPath = (link: HierarchyPointLink<FamilyNode>): string | null => {
    const d3LinkVertical = d3
      .linkVertical<HierarchyPointLink<FamilyNode>, HierarchyPointNode<FamilyNode>>()
      .x((d) => d.x)
      .y((d) => d.y)

    const path = d3LinkVertical(link)
    return path || null
  }
</script>

<style scoped>
  path.link {
    fill: none;
    opacity: 1;
    transition: opacity 1s ease;
    stroke-width: 10;
    stroke: black;
  }
</style>
