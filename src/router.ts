import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from './components/pages/HomePage.vue'
import PokedexPage from './components/pages/PokedexPage.vue'
import PokemonPage from './components/pages/PokemonPage.vue'


export const routes = [
  { path: '/', component: HomePage },
  { path: '/pokedex', component: PokedexPage },
  { path: '/pokemon/:id', component: PokemonPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router