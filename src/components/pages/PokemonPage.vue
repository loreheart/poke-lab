<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import PokedexMiniNav from '../PokedexMiniNav.vue'
  import { usePokedexPageStore } from '../../stores/pokedex'
  import { Pokemon, PokemonFull, PokemonType } from '../../types/index'
  import { getBigBulbaImg, cleanUp, gameTypeIcon, getPrevItem, getNextItem } from '../../helpers'
  import { pokeTypes } from '../../data/poke-data' 

  let pokemon = ref()
  let prevPokemon = ref()
  let nextPokemon = ref()
  let pokemonFull = ref()
  let selected = ref()
  let imageUrl: string

  const route = useRoute()
  const router = useRouter()

  const pokedexStore = usePokedexPageStore()

  const loadPrevAndNext = (dexNum: string): void => {
    const pokedex = pokedexStore.pokedex.value
    prevPokemon.value = getPrevItem(pokedex, dexNum)
    nextPokemon.value = getNextItem(pokedex, dexNum)
  }

  const loadPokemon = async (dexNum: string): Promise<Pokemon | void> => {
    if (!dexNum || pokemon.value && pokemon.value.id === +dexNum) return
    const loadedPokemon = pokedexStore.loadPokemon(+dexNum)
    pokemonFull.value = await pokedexStore.loadFullPokemon(+dexNum)
    if (loadedPokemon) {
      imageUrl = getBigBulbaImg(loadedPokemon)
      pokemon.value = loadedPokemon
      loadPrevAndNext(dexNum)
      return loadedPokemon
    }
  }

  const updatePokemonOnRoute = (newId: string) => {
    router.push(`/pokemon/${newId}`)
    loadPokemon(newId)
  }

  const getPokeType = (pokeTypeName: string): PokemonType => {
    const selectedType = pokeTypes.find(pokeType => pokeType.name === pokeTypeName)
    return selectedType as PokemonType
  }

  if (route.params.id) {
    loadPokemon(route.params.id as string)
  }

  const cleanUpFlavorText = cleanUp

  const getPokeTypeIcon = gameTypeIcon

  watch(
    () => route.params.id,
    async newId => updatePokemonOnRoute(newId as string)
  )
  
  watch(
    () => pokedexStore.selected as PokemonFull,
    (selectedPokemon: PokemonFull) => selected.value = selectedPokemon
  )
</script>

<template>
  <div class="pokedex-detail flex my-12 justify-center" v-if="pokemon">
    <div class="dex-left">
      <div class="top-nav">
        {{  prevPokemon }}
        <PokedexMiniNav v-if="prevPokemon" :pokemon="prevPokemon"
        side="left" @updatePokemon="updatePokemonOnRoute(`${prevPokemon.id}`)" />
      </div>
      <div class="pokemon-view w-full h-92 flex justify-center">
        <img :src="imageUrl" :alt="pokemon.name">
      </div>
      <h1 class="text-4xl m-2 capitalize text-white font-bold">
        #{{ pokemon.id }} {{ pokemon && pokemon.name && pokemon.name.replace("-", " ") }}
      </h1>
      <div class="text-2xl" v-if="selected && selected.species">
        {{ selected.species.genus }}
      </div>
    </div>
    <div class="dex-right">
      <div class="top-nav">
        <PokedexMiniNav v-if="nextPokemon" :pokemon="nextPokemon"
        side="right" @updatePokemon="updatePokemonOnRoute(`${nextPokemon.id}`)" />
      </div>
      <div class="pokemon-view w-full h-92 text-pink-600 font-bold" v-if="selected">
        <div class="my-1 pb-2 text-shadowed" v-for="flavor of selected.specy.flavor.slice(0, 4)"
          :key="`flavor-text-${flavor.game.name}`">
          {{ cleanUpFlavorText(flavor.flavor_text) }} - 
          <span class="capitalize">Pokemon {{ flavor.game.name }}</span>
        </div>
      </div>
      <div class="stats flex justify-between w-full font-bold" v-if="selected">
        <div class="m-2 px-2">Height: {{ selected.height }}</div>
        <div class="m-2 px-2">Weight: {{ selected.weight }}</div>
      </div>
      <div class="types flex justify-between w-full font-bold" v-if="selected">
        <div class="w-32 m-2 py-2 px-4 gap-2 capitalize text-xl text-shadowed flex justify-center content-center" :key="`type-${pokeType}`"
          v-for="pokeType of selected.types"
          :style="{backgroundColor: getPokeType(pokeType.type.name).color}"
          >
          <img class="p-0.5 w-10" :src="getPokeTypeIcon(pokeType.type.name)" :alt="pokeType.type.name">
          <div class="flex flex-col justify-center">{{ pokeType.type.name }}</div>
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
