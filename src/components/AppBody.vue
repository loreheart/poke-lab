<script setup lang="ts">
  import AppNavbar from './AppNavbar.vue'

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

</script>

<template>
  <AppNavbar :navItems="navItems" />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
