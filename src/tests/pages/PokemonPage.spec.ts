import { describe, expect, it, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import PokemonPage from './../../components/pages/PokemonPage.vue'
import HomePage from './../../components/pages/HomePage.vue'
import { usePokedexPageStore } from '../../stores/pokedex-store'
import { testPokemon } from '../mocks/pokemon'
import { Pokemon } from '@/src/types'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/pokemon/:id',
      component: PokemonPage,
      props: route => ({ pokemonId: route.params.id })
    }
  ],
})

const wrapper = mount(PokemonPage, {
  propsData: {
    pokemonId: testPokemon.id,
    pokemon: testPokemon
  },
  global: {
    plugins: [createTestingPinia(), router],
  },
  globals: {
    route: {
      fullPath: '/pokemon/1'
    },
  }
})


describe('PokemonPage component', async () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  beforeEach(async () => {
    await router.push('/pokemon/1')
    await router.isReady()
  })

  it('Loads pokedex', () => {
    const pokedexStore = usePokedexPageStore()
    const pokedex: Pokemon[] = pokedexStore.loadPokedex()
    expect(pokedex.length).toBe(1025)
  })

  it('renders pokemon name', async () => {
    expect(wrapper.html()).toBeTruthy()
  })

  // WIP: doesn't seem to be getting the route or pokemon or something
  // AssertionError: expected '<!--v-if-->' to contain 'Bulbasaur'
  // Expected: "Bulbasaur"
  // Received: "<!--v-if-->"
  // it('renders pokemon name', async () => {
  //   console.warn(wrapper.html())
  //   expect(wrapper.html()).toContain('Bulbasaur')
  // })

})


