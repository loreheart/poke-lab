<script setup lang="ts">
import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import FilterBar from '../../components/FilterBar.vue'
  import PokedexTile from '../../components/PokedexTile.vue'
  import { usePokedexPageStore } from '../../stores'
  import { pokemonIsFromRegion } from '../../helpers'
  import { Pokemon } from '../../types'
  import { generations } from '../../data'

  const limit = ref(100)
  const generation = ref('')
  const router = useRouter()
  const pokedexStore = usePokedexPageStore()
  const pokedex: Pokemon[] = pokedexStore.loadPokedex()
  
  const selectPokemon = (pokemon: Pokemon) => {
    console.warn('selectPokemon', pokemon)
    router.replace({ path: `/pokemon/${pokemon.id}`})
  }

  const limitOptions = [9, 30, 100, 300, 600, 1025]
  const regionOptions = generations.map(({ region }) => region)

  const filterPokedex = (pokedex: Pokemon[]) => {
    if (!generation.value) return pokedex
    return pokedex.filter((poke: Pokemon) => pokemonIsFromRegion(poke, generation.value))
  }

  const limitPokedex = (pokedex: Pokemon[]) => {
    return pokedex.slice(0, limit.value)
  }

</script>

<template>
  <h1 class="text-4xl m-2">Pokedex</h1>
  
  <FilterBar title="Limit" :options="limitOptions" :selected="limit"
    @selectOption="(count) => limit = count" />
  
  <FilterBar title="Region" :options="regionOptions" :selected="generation"
    @selectOption="(region) => generation = region" />

  <div class="pokedex flex flex-wrap justify-center" v-if="pokedex">
    <div class="pokemon-tileset" v-for="pokemon in limitPokedex(filterPokedex(pokedex))"
      :key="`poke-tile-${pokemon.name}`">
      <PokedexTile class="cursor-pointer" :pokemon="pokemon"
        @selectPokemon="() => selectPokemon(pokemon)" />
    </div>
  </div>

</template>

<style scoped>

</style>
