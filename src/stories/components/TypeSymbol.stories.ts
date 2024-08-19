import type { Meta, StoryObj } from '@storybook/vue3'

import TypeSymbol from '../../components/TypeSymbol.vue'
import { pokeTypes } from '../../data/poke-data'

const meta = {
  title: 'PokeLab/TypeSymbol',
  component: TypeSymbol,
  argTypes: {
    pokeTypeName: { control: 'radio', options: pokeTypes.map(({ name }) => name) },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
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

export const NoTitleMiniRounded: Story = {
  args: {
    pokeTypeName: pokeTypes[11].name,
    shape: 'circular',
    size: 'mini',
    showName: false,
  },
}

export const NoTitleSmall: Story = {
  args: {
    pokeTypeName: pokeTypes[1].name,
    shape: 'squared',
    size: 'small',
    showName: false,
  },
}

export const NoTitleMedium: Story = {
  args: {
    pokeTypeName: pokeTypes[2].name,
    shape: 'squared',
    size: 'medium',
    showName: false,
  },
}

export const NoTitleLarge: Story = {
  args: {
    pokeTypeName: pokeTypes[3].name,
    shape: 'squared',
    size: 'large',
    showName: false,
  },
}

export const NoTitleRoundedSmall: Story = {
  args: {
    pokeTypeName: pokeTypes[4].name,
    shape: 'circular',
    size: 'small',
    showName: false,
  },
}

export const NoTitleRoundedMedium: Story = {
  args: {
    pokeTypeName: pokeTypes[5].name,
    shape: 'circular',
    size: 'medium',
    showName: false,
  },
}

export const NoTitleRoundedLarge: Story = {
  args: {
    pokeTypeName: pokeTypes[6].name,
    shape: 'circular',
    size: 'large',
    showName: false,
  },
}

export const TitleSmallRounded: Story = {
  args: {
    pokeTypeName: pokeTypes[7].name,
    shape: 'circular',
    size: 'small',
    showName: true,
  },
}

export const TitleMediumRounded: Story = {
  args: {
    pokeTypeName: pokeTypes[8].name,
    shape: 'circular',
    size: 'medium',
    showName: true,
  },
}

export const TitleLargeRounded: Story = {
  args: {
    pokeTypeName: pokeTypes[9].name,
    shape: 'circular',
    size: 'large',
    showName: true,
  },
}

export const TitleMiniSquared: Story = {
  args: {
    pokeTypeName: pokeTypes[7].name,
    shape: 'squared',
    size: 'mini',
    showName: true,
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

export const TitleMediumSquared: Story = {
  args: {
    pokeTypeName: pokeTypes[8].name,
    shape: 'squared',
    size: 'medium',
    showName: true,
  },
}

export const TitleLargeSquared: Story = {
  args: {
    pokeTypeName: pokeTypes[9].name,
    shape: 'squared',
    size: 'large',
    showName: true,
  },
}