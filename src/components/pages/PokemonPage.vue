<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'

  import { usePokedexPageStore } from '../../stores/pokedex'
  import { Pokemon } from '../../types/index'

  const route = useRoute()
  const router = useRouter()

  const pokedexStore = usePokedexPageStore()

  let dexNum = parseInt(route.params.id as string)

  let pokemon: Pokemon = pokedexStore.loadPokemon(dexNum)

  const getBigBulbaImg = (pokemon: Pokemon) => {

    const urlRoot = "https://bifrost.loreheart.com/projects/pokedex/bulbapedia"
    
    const idString: string = `${pokemon.id}`.padStart(4, '0')
    const capitalName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    const urlFriendlyName = capitalName.replace('-', '%20')
    return `${urlRoot}/${idString}%20${urlFriendlyName}.png`
  }

  let imageUrl = getBigBulbaImg(pokemon)

  const updatePokemon = (newPokemon: Pokemon) => {
    dexNum = newPokemon.id
    pokemon = pokedexStore.loadPokemon(dexNum)
    imageUrl = getBigBulbaImg(pokemon)
    router.push(`/pokemon/${dexNum}`)
  }


</script>

<template>
  <div class="pokedex-detail flex my-12 justify-center" v-if="pokemon">
    <div class="dex-left">
      <div class="top-nav">
        <div class="previous-pokemon" v-if="pokemon.previous">
          <span class="text-xl font-bold cursor-pointer" @click="updatePokemon(pokemon.previous)">
            &#9668; #{{ pokemon.previous.id }} {{ pokemon.previous.name }}
          </span>
        </div>
      </div>
      <div class="pokemon-view flex justify-center">
        <img :src="imageUrl" :alt="pokemon.name">
      </div>
      <h1 class="text-4xl m-2 capitalize text-white font-bold">
        #{{ pokemon.id }} {{ pokemon.name }}
      </h1>
    </div>
    <div class="dex-right">
      <div class="top-nav">
        <div class="next-pokemon" v-if="pokemon.next">
          <span class="text-xl font-bold cursor-pointer" @click="updatePokemon(pokemon.next)">
            #{{ pokemon.next.id }} {{ pokemon.next.name }} &#9658;
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
