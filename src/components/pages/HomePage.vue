<script setup lang="ts">
  import { storeToRefs } from 'pinia'

  import { usePokedexPageStore } from '../../stores'

  const pokedexStore = usePokedexPageStore()
  pokedexStore.loadPokedex()
  const { nationalDex, pokedex } = storeToRefs(pokedexStore)
</script>

<template>
  <h1 class="text-4xl m-2">PokeLab Home</h1>

  <h2 class="text-2xl m-2">Stats</h2>
  <ul>
    <li v-if="pokedex">{{ pokedex.length }} Pokemon</li>
    <li v-if="nationalDex">{{ Object.keys(nationalDex).length }} Pokemon Full Data Loaded Locally</li>
  </ul>

  <h2 class="text-2xl m-2">Current Features</h2>
  <ul>
    <li>Pokedex page</li>
    <li>Pokemon detail page</li>
  </ul>

  <h2 class="text-2xl m-2">Features in Progress</h2>
  <ul>
    <li>Pokedex page - enhancements</li>
    <li>Pokemon detail page - enhancements</li>
  </ul>

  <h2 class="text-2xl m-2">Future Features Planned</h2>
  <ul>
    <li>Gym Leaders</li>
    <li>Type Coverage Calculator</li>
    <li>Living Dex Tracker</li>
  </ul>
</template>

<style scoped>

</style>
