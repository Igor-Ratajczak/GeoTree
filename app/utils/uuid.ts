export const uuid = () => {
  const uuid = crypto.randomUUID()
  const date = new Date().getTime()
  return `${uuid}-${date}`
}
