import type { Meta, StoryObj } from '@storybook/vue3'

import PokedexTile from '../../components/PokedexTile.vue'
import { testPokemon, testParadoxPokemon } from '../../tests/mocks'
import { pokeTypes } from '../../data/poke-data'

const meta = {
  title: 'PokeLab/PokedexTile',
  component: PokedexTile,
  argTypes: {
    pokemon: {
      types: { control: 'select', options: pokeTypes },
    }
  },
  args: {
    pokemon: {
      ...testPokemon
    },
  },
} satisfies Meta<typeof PokedexTile>

export default meta
type Story = StoryObj<typeof meta>

export const SingleName: Story = {
  args: {
    pokemon: {
      ...testPokemon
    },
  },
}

export const TwoName: Story = {
  args: {
    pokemon: {
      ...testParadoxPokemon
    },
  },
}
