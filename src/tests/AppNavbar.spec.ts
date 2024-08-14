import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppNavbar from '../components/AppNavbar.vue'
import { mockRoute, mockRouter } from './mocks/routing'

const emptyNav = mount(AppNavbar, {
  propsData: {
    navItems: []
  },
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    }
  }
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
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    }
  }
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


