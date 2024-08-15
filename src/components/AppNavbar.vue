<script setup lang="ts">
  import type { PropType } from 'vue'
  import { NavItem } from '../types'

  defineProps({
    navItems: {
      type: Array as PropType<Array<NavItem>>,
      required: false,
      default: () => []
    }
  })
</script>

<template>
  <div id="navbar" class="navbar flex gap-4 px-8 py-2 mb-2 border-b border-white justify-center">
    <div class="text-lg">
      PokeLab
    </div>
    <img class="logo h-8 w-8" src="/pokeball-icon.png" alt="Pokeball logo white" />
    <nav class="nav-items flex gap-4" v-if="navItems">
      <div class="nav-item justify-center text-lg" v-for="navItem in navItems" :key="`nav-link-${navItem.text}`">
        <RouterLink :to="'/' + navItem.link" active-class="active" v-if="navItem">
          {{ navItem.text }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  #navbar {
    background-color: #880000;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
  }
  a {
    color: #ffffff;
  }
  .active {
    color: #FFAA00;
  }
</style>
