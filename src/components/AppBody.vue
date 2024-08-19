<script setup lang="ts">
  import { watch, ref, Ref } from 'vue'
  import AppNavbar from './AppNavbar.vue'
  import AppFooter from './AppFooter.vue'
  import { useRoute } from 'vue-router'

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

  const routeText: Ref<string> = ref(route && route.path || '')
  pokedexPageStore.loadLocalNationalDex()
  
  watch(
    () => route && route.path,
    async newRoutePath => {
      routeText.value = newRoutePath
      pokedexPageStore.loadLocalNationalDex()
    }
  )

</script>

<template>
  <AppNavbar :navItems="navItems" />
  <main class="mb-0 flex-grow">
    <div class="route-bread text-xl text-center color-white">
      Route: {{ routeText }}
    </div>
    <RouterView :key="route.fullPath" />
  </main>
  <AppFooter />
</template>

<style scoped>

</style>
