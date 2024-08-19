<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import AppNavbar from './AppNavbar.vue'
  import AppFooter from './AppFooter.vue'
  import { NavItem } from '../types'
  import { usePokedexPageStore } from '../stores'

  const pokedexPageStore = usePokedexPageStore()

  const navItems: NavItem[] = [
    {
      text: "Home",
      link: ''
    },
    {
      text: "Pokedex",
      link: 'pokedex'
    },
  ]

  const route = useRoute()

  pokedexPageStore.loadLocalNationalDex()

</script>

<template>
  <AppNavbar :navItems="navItems" />
  <main class="mb-0 flex-grow">
    <RouterView :key="route.fullPath" />
  </main>
  <AppFooter />
</template>

<style scoped>

</style>
