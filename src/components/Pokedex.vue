<script setup lang="ts">
  import { usePokedexPageStore } from '../stores/pokedex'
  import PokedexEntry from '../components/PokedexTile.vue'
  import { Pokemon } from '../types/index'

  const pokedexStore = usePokedexPageStore()

  const pokedex: Pokemon[] = pokedexStore.loadPokedex()

  const limit = 1025

</script>

<template>
  <h1>Pokedex</h1>

  <div class="pokedex flex flex-wrap content-center" v-if="pokedex">
    <div class="pokemon-tile w-64" v-for="pokemon in pokedex.slice(0, limit)">
      <PokedexEntry :pokemon="pokemon" />
    </div>
    
  </div>

</template>

<style scoped>

</style>
