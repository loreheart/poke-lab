import { createMemoryHistory, createRouter } from 'vue-router'

import AppHome from './components/AppHome.vue'
import Pokedex from './components/Pokedex.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/pokedex', component: Pokedex },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router