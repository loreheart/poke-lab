import { createMemoryHistory, createRouter } from 'vue-router'

import AppHome from './components/pages/HomePage.vue'
import Pokedex from './components/pages/PokedexPage.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/pokedex', component: Pokedex },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router