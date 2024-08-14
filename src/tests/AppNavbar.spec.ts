import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppNavbar from '../components/AppNavbar.vue'
import { routeGlobalsWithRouting } from './mocks/routing'

const emptyNav = mount(AppNavbar, {
  propsData: {
    navItems: []
  },
  ...routeGlobalsWithRouting
})

const navbar1 = mount(AppNavbar, {
  propsData: {
    navItems: [
      {
        text: 'Home',
        link: ''
      }
    ]
  },
  ...routeGlobalsWithRouting
})

describe('AppNavbar component', async () => {
  it('renders heading text', async () => {
    expect(emptyNav.text()).toContain('PokeLab')
    expect(emptyNav.text()).not.toContain('Home')
  })
  
  it('renders nav items', async () => {
    expect(navbar1.text()).toContain('Home')
  })
})


