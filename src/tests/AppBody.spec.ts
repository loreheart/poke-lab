import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import AppBody from '../components/AppBody.vue'
import { routes } from '../router'


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const appBody = mount(AppBody, {
  global: {
    plugins: [createTestingPinia(), router],
  },
  globals: {
    $routes: routes,
    $router: router
  }
})

describe('AppBody component', async () => {
  it('renders the breadcrumb', async () => {
    expect(appBody.text()).toContain('© 2024 LoreHeart')
  })

  it('renders the home route', async () => {
    expect(appBody.text()).toContain('PokeLab')
  })

})


