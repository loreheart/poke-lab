<script setup lang="ts">
  import type { PropType } from 'vue';
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
  <div id="navbar" class="navbar flex gap-4 px-12 py-4">
    <div class="text-lg">PokeLab</div>
    <nav class="nav-items flex gap-4">
      <div class="nav-item justify-center text-lg" v-for="navItem in navItems">
        <RouterLink :to="'/' + navItem.link" :class="{
          active: '/' + navItem.link === $route.fullPath
        }">
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
  }
  a {
    color: #ffffff;
  }
  .active {
    color: #FF0000;
  }
</style>
