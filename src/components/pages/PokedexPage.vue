<script setup lang="ts">
import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import PokedexTile from '../../components/PokedexTile.vue'
  import { usePokedexPageStore } from '../../stores'
  import { Pokemon } from '../../types'

  const limit = ref(100)
  const router = useRouter()
  const pokedexStore = usePokedexPageStore()
  const pokedex: Pokemon[] = pokedexStore.loadPokedex()
  
  const selectPokemon = (pokemon: Pokemon) => {
    console.warn('selectPokemon', pokemon)
    router.replace({ path: `/pokemon/${pokemon.id}`})
  }

  const limitOptions = [30, 100, 300, 600, 1025]

</script>

<template>
  <h1 class="text-4xl m-2">Pokedex</h1>
  
  <div class="filters flex gap-4 justify-center">
    <div class="quantity" v-for="count in limitOptions" :key="`limit-count-${count}`">
      <button @click="limit = count">{{ count }}</button>
    </div>
  </div>

  <div class="pokedex flex flex-wrap justify-center" v-if="pokedex">
    <div class="pokemon-tileset" v-for="pokemon in pokedex.slice(0, limit)" :key="`poke-tile-${pokemon.name}`">
      <PokedexTile class="cursor-pointer" :pokemon="pokemon" @selectPokemon="() => selectPokemon(pokemon)" />
    </div>
    
  </div>

</template>

<style scoped>

</style>
