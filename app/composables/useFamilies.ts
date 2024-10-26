const { state } = useAppStore()

export const getFamily = () => {
  const i = state.selectedFamily
  let number = 0

  state.AllFamilies.filter((family, index) => {
    if (family?.id === i) number = index
    return index
  })
  return number
}
