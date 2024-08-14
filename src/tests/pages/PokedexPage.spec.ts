import { expect, it, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import PokedexPage from '../../components/pages/PokedexPage.vue'
import { usePokedexPageStore } from '../../stores/pokedex'
import { Pokemon } from '../../types/index'


const wrapper = mount(PokedexPage, {
  global: {
    plugins: [createTestingPinia()],
  },
})

describe('Pokedex Page Component', () => {
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

