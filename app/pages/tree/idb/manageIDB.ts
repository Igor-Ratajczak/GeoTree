import { openDB } from 'idb'

const dbPromise = openDB('profile', 1, {
  upgrade(db) {
    const store = db.createObjectStore('icons')
    store.createIndex('id', 'id', { unique: false })
    store.createIndex('person', 'person', { unique: false })
    store.createIndex('spouse', 'spouse', { unique: false })
  },
})

export async function get(key: string) {
  return (await dbPromise).get('icons', key)
}
export async function set(
  key: IDBKeyRange | IDBValidKey | undefined,
  val: string,
  valSpouse: string
) {
  return (await dbPromise).put('icons', { person: val, spouse: valSpouse }, key)
}
export async function del(key: IDBKeyRange | IDBValidKey) {
  return (await dbPromise).delete('icons', key)
}
export async function clear() {
  return (await dbPromise).clear('icons')
}
export async function keys() {
  return (await dbPromise).getAllKeys('icons')
}
