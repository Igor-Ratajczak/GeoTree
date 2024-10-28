import * as d3 from 'd3'
import { hierarchy, tree } from 'd3-hierarchy'
import type { ShallowRef } from 'vue'

const { state } = useAppStore()

// create d3.js tree
class Tree {
  private _svgRef = shallowRef<SVGGElement | null>(null)
  private _gRef = shallowRef<SVGGElement | null>(null)

  public initializeTree(
    containerRef: Readonly<ShallowRef<HTMLDivElement | null>>,
    svgRef: Readonly<ShallowRef<SVGSVGElement | null>>,
    gRef: Readonly<ShallowRef<SVGGElement | null>>,
    treeData: globalThis.Ref<
      d3.HierarchyNode<FamilyNode> | null,
      d3.HierarchyNode<FamilyNode> | null
    >,
    family: FamilyNode
  ) {
    this._svgRef = svgRef
    this._gRef = gRef
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
      state.transform = { x: e.transform.x, y: e.transform.y, k: e.transform.k }
      d3.select(gRef.value!).attr(
        'transform',
        `translate(${e.transform.x}, ${e.transform.y}) scale(${e.transform.k})`
      )
    })
    if (!gRef.value?.hasAttribute('transform')) {
      d3.select(svgRef.value!)
        .call(zoom)
        .call(zoom.transform as any, d3.zoomIdentity.scale(1).translate(width / 2, height / 4))
    }
  }

  public animateTree(newTransform: { x: number; y: number; k: number }) {
    const newVal = newTransform
    const oldVal = state.transform
    if (
      state.old_active_person === state.active_person ||
      (newVal.x === oldVal?.x && newVal.y === oldVal?.y && newVal.k === oldVal?.k)
    )
      return

    const animationData = [
      { transform: `translate(${oldVal!.x}px, ${oldVal!.y}px) scale(${oldVal!.k})` },
      { transform: `translate(${newVal!.x}px, ${newVal!.y}px) scale(1)` },
    ]
    const animationTiming = {
      duration: 1000,
      easing: 'ease-in-out',
    }
    const animation = this._gRef.value!.animate(animationData, animationTiming)

    animation.onfinish = () => {
      const zoom = d3.zoom<SVGSVGElement, unknown>()
      d3.select(this._svgRef.value!).call(
        zoom.transform as any,
        d3.zoomIdentity.scale(1).translate(newVal.x, newVal.y)
      )
      d3.select(this._gRef.value!).attr(
        'transform',
        `translate(${newVal!.x}, ${newVal!.y}) scale(1)`
      )
      state.transform = newVal
      state.old_active_person = state.active_person
    }
  }
}
export const TreeInstance = new Tree()
