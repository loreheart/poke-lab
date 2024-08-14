import { expect, it, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import { usePokedexPageStore } from '../stores/pokedex'
import { Pokemon } from '../types/index'

import Pokedex from '../components/pages/PokedexPage.vue'

const wrapper = mount(Pokedex, {
  global: {
    plugins: [createTestingPinia()],
  },
})

describe('Pokedex Page Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('testing Pokedex component', async () => {
    expect(wrapper.text()).toContain('Pokedex')
  })

  it('Loads pokedex', () => {
    const pokedexStore = usePokedexPageStore()
    const pokedex: Pokemon[] = pokedexStore.loadPokedex()
    expect(pokedex.length).toBe(1025)
  })

})

