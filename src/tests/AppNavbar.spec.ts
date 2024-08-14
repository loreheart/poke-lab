import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppNavbar from '../components/AppNavbar.vue'

const mockRoute = {
  params: {
    id: 1
  },
  fullPath: ''
}
const mockRouter = {
  push: () => {}
}

const routeGlobals = {
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    }
  }
}

const emptyNav = mount(AppNavbar, {
  propsData: {
    navItems: []
  },
  ...routeGlobals
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
  ...routeGlobals
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


