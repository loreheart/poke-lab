import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppHome from '../components/AppHome.vue'

const wrapper = mount(AppHome);

it('testing AppHome component', async () => {
  expect(wrapper.text()).toContain('PokeLab Home')
})
