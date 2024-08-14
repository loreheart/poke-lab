import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import PokedexTile from '../components/PokedexTile.vue'

const wrapper = mount(PokedexTile, {
  propsData: {
    pokemon: {
      id: 1,
      name: "bulbasaur", 
      types: [
        {
          type: {
            name: "grass"
          }
        },
        {
          type: {
            name: "poison"
          }
        }
      ]
    }
  }
})

describe('PokedexTile component', async () => {
  it('renders Pokemon name', async () => {
    expect(wrapper.text()).toContain('#1 bulbasaur')
  })
})
