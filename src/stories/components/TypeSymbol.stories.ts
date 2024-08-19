import type { Meta, StoryObj } from '@storybook/vue3'

import TypeSymbol from '../../components/TypeSymbol.vue'
import { pokeTypes } from '../../data/poke-data'

const meta = {
  title: 'PokeLab/TypeSymbol',
  component: TypeSymbol,
  argTypes: {
    pokeTypeName: { control: 'radio', options: pokeTypes.map(({ name }) => name) },
    size: { control: 'radio', options: ['mini', 'small', 'medium', 'large'] },
    shape: { control: 'radio', options: ['squared', 'circular'] },
    showName: { control: 'boolean', options: [true, false] }
  },
} satisfies Meta<typeof TypeSymbol>

export default meta
type Story = StoryObj<typeof meta>

export const Defaults: Story = {
  args: {
    pokeTypeName: pokeTypes[0].name,
    shape: 'squared',
    size: 'medium',
    showName: true,
  },
}

export const MiniPokedex: Story = {
  args: {
    pokeTypeName: pokeTypes[11].name,
    shape: 'circular',
    size: 'mini',
    showName: false,
  },
}

export const TitleSmallSquared: Story = {
  args: {
    pokeTypeName: pokeTypes[7].name,
    shape: 'squared',
    size: 'small',
    showName: true,
  },
}

export const PokedexSquared: Story = {
  args: {
    pokeTypeName: pokeTypes[8].name,
    shape: 'squared',
    size: 'medium',
    showName: true,
  },
}


export const BigRoundGrass: Story = {
  args: {
    pokeTypeName: 'grass',
    shape: 'circular',
    size: 'large',
    showName: true
  }
}
