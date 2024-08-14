<script setup lang="ts">
  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { usePokedexPageStore } from '../../stores/pokedex'
  import { Pokemon } from '../../types/index'
  import { getBigBulbaImg } from '../../helpers'

  let dexNum: string | number, imageUrl: string, pokemon: Pokemon

  const route = useRoute()
  const router = useRouter()

  const pokedexStore = usePokedexPageStore()

  const loadPokemon = (dexNum: string | number) => {
    pokemon = pokedexStore.loadPokemon(dexNum)
    if (pokemon) {
      imageUrl = getBigBulbaImg(pokemon)
    }
    
  }

  const updatePokemon = (newPokemon: Pokemon) => {
    dexNum = newPokemon.id
    loadPokemon(dexNum)
    router.push(`/pokemon/${dexNum}`)
  }

  if (route.params.id) {
    dexNum = parseInt(route.params.id as string)
    if (dexNum) {
      loadPokemon(dexNum)
    }
  }

  watch(
    () => route.params.id,
    async newId => {
      dexNum = parseInt(newId as string)
      if (dexNum) {
        loadPokemon(dexNum)
      }
    }
  )

</script>

<template>
  <div class="pokedex-detail flex my-12 justify-center" v-if="pokemon">
    <div class="dex-left">
      <div class="top-nav">
        <div class="previous-pokemon" v-if="pokemon.previous">
          <span class="text-xl font-bold capitalize cursor-pointer" @click="updatePokemon(pokemon.previous)">
            &#9668; #{{ pokemon.previous.id }} {{ pokemon.previous.name.replace("-", " ") }}
          </span>
        </div>
      </div>
      <div class="pokemon-view flex justify-center">
        <img :src="imageUrl" :alt="pokemon.name">
      </div>
      <h1 class="text-4xl m-2 capitalize text-white font-bold">
        #{{ pokemon.id }} {{ pokemon.name.replace("-", " ") }}
      </h1>
    </div>
    <div class="dex-right">
      <div class="top-nav">
        <div class="next-pokemon" v-if="pokemon.next">
          <span class="text-xl font-bold capitalize cursor-pointer" @click="updatePokemon(pokemon.next)">
            #{{ pokemon.next.id }} {{ pokemon.next.name.replace("-", " ") }} &#9658;
          </span>
          
        </div>
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
