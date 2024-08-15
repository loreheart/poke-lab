<script setup lang="ts">
  import { usePokedexPageStore } from '../../stores/pokedex'
  import PokedexTile from '../../components/PokedexTile.vue'
  import { Pokemon } from '../../types/index'

  const pokedexStore = usePokedexPageStore()

  const pokedex: Pokemon[] = pokedexStore.loadPokedex()

  const limit = 1025

</script>

<template>
  <h1 class="text-4xl m-2">Pokedex</h1>

  <div class="pokedex flex flex-wrap justify-center" v-if="pokedex">
    <div class="pokemon-tileset" v-for="pokemon in pokedex.slice(0, limit)" :key="`poke-tile-${pokemon.name}`">
      <RouterLink :to="'/pokemon/' + pokemon.id">
        <PokedexTile :pokemon="pokemon" />
      </RouterLink>
      
    </div>
    
  </div>

</template>

<style scoped>

</style>
