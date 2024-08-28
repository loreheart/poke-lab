import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './components/pages/HomePage.vue'
import DevPage from './components/pages/DevPage.vue'
import PokedexPage from './components/pages/PokedexPage.vue'
import PokemonPage from './components/pages/PokemonPage.vue'


export const routes = [
  { path: '/', component: HomePage },
  { path: '/dev', component: DevPage },
  { path: '/pokedex', component: PokedexPage },
  { path: '/pokemon/:id', component: PokemonPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router