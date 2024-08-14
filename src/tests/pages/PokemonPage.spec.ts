import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'


import PokemonPage from './../../components/pages/PokemonPage.vue'
import { testPokemon } from '../mocks/pokemon'
import { routes } from '../../router'
import { createRouter, createWebHistory } from 'vue-router'
import { usePokedexPageStore } from '../../stores/pokedex'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const wrapper = mount(PokemonPage, {
  props: {
    params: {
      id: 1
    },
    pokemon: testPokemon
  },
  global: {
    plugins: [createTestingPinia(), router],
  }
})

const pokedexStore = usePokedexPageStore()

describe('PokemonPage component', async () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('renders pokemon name', async () => {
    pokedexStore.loadPokedex()
    expect(wrapper.html()).toContain('Bulbasaur')
  })

})


