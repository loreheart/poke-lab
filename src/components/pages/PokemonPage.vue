<script setup lang="ts">
  import { ref, Ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import PokedexMiniNav from '../PokedexMiniNav.vue'
  import { usePokedexPageStore } from '../../stores/pokedex'
  import { Pokemon } from '../../types/index'
  import { getBigBulbaImg } from '../../helpers'

  let pokemon: Ref<Pokemon | undefined> = ref()
  let imageUrl: string

  const route = useRoute()
  // const router = useRouter()

  const pokedexStore = usePokedexPageStore()

  const loadPokemon = (dexNum: string | number | undefined): Pokemon | void => {
    if (!dexNum) return
    const loadedPokemon = pokedexStore.loadPokemon(dexNum)
    if (loadedPokemon) {
      imageUrl = getBigBulbaImg(loadedPokemon)
      pokemon.value = loadedPokemon
      return loadedPokemon
    }
  }

  const updatePokemonOnRoute = (newId: string | string[]) => {
    loadPokemon(Array.isArray(newId) ? newId.shift() : newId)
  }

  if (route.params.id) {
    console.log('First route gate', route.params.id)
    updatePokemonOnRoute(route.params.id)
  }

  watch(
    () => route.params.id,
    async newId => updatePokemonOnRoute(newId)
  )
</script>

<template>
  <div class="pokedex-detail flex my-12 justify-center" v-if="pokemon">
    <div class="dex-left">
      <div class="top-nav">
        <PokedexMiniNav v-if="pokemon.previous" :pokemon="pokemon.previous"
        side="left" @updatePokemon="updatePokemonOnRoute(pokemon.previous.id)" />
      </div>
      <div class="pokemon-view flex justify-center">
        <img :src="imageUrl" :alt="pokemon.name">
      </div>
      <h1 class="text-4xl m-2 capitalize text-white font-bold">
        #{{ pokemon.id }} {{ pokemon && pokemon.name && pokemon.name.replace("-", " ") }}
      </h1>
    </div>
    <div class="dex-right">
      <div class="top-nav">
        <PokedexMiniNav v-if="pokemon.next" :pokemon="pokemon.next"
        side="right" @updatePokemon="updatePokemonOnRoute(pokemon.next.id)" />
      </div>
    </div>
  </div>
  

</template>

<style scoped>
  .pokedex-detail {
    .dex-left, .dex-right {
      margin: 0.5rem;
      padding: 0.5rem;
      width: clamp(12rem, 50vw, 24rem);
      border: 0.5rem solid #af0b0b;
      background-color: #880000;
    }
    .pokemon-view {
      padding: 0.5rem;
      background: linear-gradient(#b9e0de 25%, #73c0bc);
    }

    .top-nav {
      padding: 0.5rem;
      margin: 0.5rem;
    }
    @media screen and (max-width: 42rem) {
      flex-direction: column;
      align-items: center;
      .dex-left, .dex-right {
        width: clamp(12rem, 90vw, 24rem);
      }
    }
  }
</style>
