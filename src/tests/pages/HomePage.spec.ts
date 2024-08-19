import { expect, it, describe, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import HomePage from '../../components/pages/HomePage.vue'
import { mockRoute, mockRouter } from '../mocks/routing'
import { usePokedexPageStore } from '../../stores/pokedex-store'
import { Pokemon } from '../../types/index'

const wrapper = mount(HomePage, {
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    },
    plugins: [createTestingPinia()],
  }
})

describe('Home Page Component', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })


  it('Loads pokedex stats', () => {
    const pokedexStore = usePokedexPageStore()
    const pokedex: Pokemon[] = pokedexStore.loadPokedex()
    expect(pokedex.length).toBe(1025)
  })

  it('testing text', () => {
    const pokedexStore = usePokedexPageStore()
    pokedexStore.loadPokedex()
    expect(wrapper.text()).toContain('PokeLab Home')
  })
})
