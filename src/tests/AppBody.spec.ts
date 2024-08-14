import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import AppBody from '../components/AppBody.vue'

const appBody = shallowMount(AppBody)

describe('AppBody component', async () => {
  it('renders', async () => {
    expect(appBody.text()).not.toContain('PokeLab')
  })

})


