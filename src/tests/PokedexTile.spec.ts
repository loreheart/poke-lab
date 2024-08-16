import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import PokedexTile from '../components/PokedexTile.vue'
import { testPokemon } from './mocks/pokemon'

const wrapper = mount(PokedexTile, {
  propsData: {
    pokemon: testPokemon
  }
})

describe('PokedexTile component', async () => {
  it('renders Pokemon name', async () => {
    expect(wrapper.text()).toContain('#1 bulbasaur')
  })
})
