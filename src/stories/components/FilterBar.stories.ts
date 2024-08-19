import { PropType } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import FilterBar from '../../components/FilterBar.vue'
import { generations } from '../../data/poke-data'

const meta = {
  title: 'PokeLab/FilterBar',
  component: FilterBar,
  argTypes: {
    title: {
      types: { control: 'input' },
    },
    selected: {
      types: { control: 'input' },
    },
    options: Array as PropType<Array<number | string>>
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const LimitFilter: Story = {
  args: {
    title: 'Limit',
    selected: 9,
    options: [9, 30, 90]
  },
}

export const RegionFilter: Story = {
  args: {
    title: 'Region',
    selected: '',
    options: generations.map(gen => gen.region)
  },
}