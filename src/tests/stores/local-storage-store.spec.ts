import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useLocalStorageStore } from '../../stores/local-storage-store'

describe('Pokedex Page Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('Initializes localStorage', () => {
    const localStorageStore = useLocalStorageStore()
    
    expect(localStorageStore.ready).toBe(true)
  })

  it('Saves and loads to localStorage', () => {
    const localStorageStore = useLocalStorageStore()
    localStorageStore.setItem('test', 'test')
    expect(localStorageStore.loadItem('test')).toBe('test')
  })

  it('Resets in localStorage', () => {
    const localStorageStore = useLocalStorageStore()
    localStorageStore.setItem('test', 'test')
    localStorageStore.resetItem('test')
    expect(localStorageStore.loadItem('test')).not.toBe('test')
  })

  it('Saves and loads object keys', () => {
    const localStorageStore = useLocalStorageStore()
    localStorageStore.setItem('object', {a: 1, b: 2})
    const loadedItem = localStorageStore.loadItem('object')
    expect(loadedItem.a).toBe(1)
    expect(loadedItem.b).toBe(2)
  })

})