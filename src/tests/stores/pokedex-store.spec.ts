import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { usePokedexPageStore } from '../../stores/pokedex-store'
import { Pokemon } from '../../types/index'

describe('Pokedex Page Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('Loads pokedex', () => {
    const pokedexStore = usePokedexPageStore()
    const pokedex: Pokemon[] = pokedexStore.loadPokedex()
    expect(pokedex.length).toBe(1025)
  })

})