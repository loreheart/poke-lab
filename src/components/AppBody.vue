<script setup lang="ts">
  import { watch, ref, Ref } from 'vue'
  import AppNavbar from './AppNavbar.vue'
  import { useRoute } from 'vue-router'

  import { NavItem } from '../types'

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

  const routeText: Ref<string> = ref('')
  
  watch(
    () => route && route.path,
    async newRoutePath => {
      routeText.value = newRoutePath
    }
  )

</script>

<template>
  <AppNavbar :navItems="navItems" />
  <main>
    <div class="route-bread text-xl text-center color-white">
      Route: {{ routeText }}
    </div>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
