import { openDB } from 'idb'

const dbPromise = openDB('profile', 1, {
  upgrade(db) {
    const store = db.createObjectStore('icons')
    store.createIndex('id', 'id', { unique: false })
    store.createIndex('person', 'person', { unique: false })
    store.createIndex('spouse', 'spouse', { unique: false })
  },
})

/**
 * Get a person's icon by their id
 * @param {string} key id of the person
 */
export async function get(key: string) {
  return (await dbPromise).get('icons', key)
}
/**
 * Get all icons in the database
 */
export async function getAll() {
  return (await dbPromise).getAll('icons')
}
/**
 * Set a person's icon in the database.
 * @param {IDBKeyRange | IDBValidKey | undefined} key - The key of the person.
 * @param {string} val - The person's icon value.
 * @param {string} valSpouse - The spouse's icon value.
 */
export async function set(
  key: IDBKeyRange | IDBValidKey | undefined,
  val: string,
  valSpouse: string
) {
  return (await dbPromise).put('icons', { id: key, person: val, spouse: valSpouse }, key)
}
/**
 * Delete a person's icon from the database.
 * @param {IDBKeyRange | IDBValidKey} key - The key of the person.
 */
export async function del(key: IDBKeyRange | IDBValidKey) {
  return (await dbPromise).delete('icons', key)
}
/**
 * Clear all icons in the database.
 */
export async function clear() {
  return (await dbPromise).clear('icons')
}
