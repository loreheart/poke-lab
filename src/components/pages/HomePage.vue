<script setup lang="ts">
  import { usePokedexPageStore } from '../../stores/pokedex'
  import { Pokemon } from '../../types/index'

  const pokedexStore = usePokedexPageStore()
  const pokedex: Pokemon[] = pokedexStore.loadPokedex()
</script>

<template>
  <h1>PokeLab Home</h1>

  <h2 class="text-2xl m-2">Stats</h2>
  <ul>
    <li v-if="pokedex">{{ pokedex.length }} Pokemon</li>
  </ul>

  <h2 class="text-2xl m-2">Features in Progress</h2>
  <ul>
    <li>Pokedex page</li>
  </ul>

  <h2 class="text-2xl m-2">Future Features Planned</h2>
  <ul>
    <li>Pokemon detail page</li>
    <li>Gym Leaders</li>
    <li>Type Coverage Calculator</li>
    <li>Living Dex Tracker</li>
  </ul>
</template>

<style scoped>

</style>
