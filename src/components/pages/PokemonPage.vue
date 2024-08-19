<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'

  import PokedexMiniNav from '../PokedexMiniNav.vue'
  import TypeSymbol from '../TypeSymbol.vue'
  import { usePokedexPageStore } from '../../stores'
  import { PokemonFull } from '../../types'
  import { getBigBulbaImg, cleanUp, getPrevItem, getNextItem } from '../../helpers'

  const route = useRoute()
  const router = useRouter()

  const pokedexStore = usePokedexPageStore()

  const cleanUpFlavorText = cleanUp
  const getImageUrl = getBigBulbaImg

  let selectedPokemon = ref()
  let prevPokemon = ref()
  let nextPokemon = ref()

  const pokedex = pokedexStore.loadPokedex()

  const dexNum = route.params.id as string

  pokedexStore.loadFullPokemon(+dexNum)

  const { selected } = storeToRefs(pokedexStore)

  const updatePokemonOnRoute = (newId: string) => {
    router.replace({ path: `/pokemon/${newId}` })
  }

  const loadSelectedPokemon = (pokemon: PokemonFull): void => {
    selectedPokemon.value = pokemon
    prevPokemon.value = getPrevItem(pokedex, dexNum)
    nextPokemon.value = getNextItem(pokedex, dexNum)
  }

  loadSelectedPokemon(selected.value)

  watch(
    () => pokedexStore.selected as PokemonFull,
    (pokemon: PokemonFull) => {
      loadSelectedPokemon(pokemon)
    }
  )
</script>

<template>
  <div class="pokedex-detail flex my-4 justify-center">
    <div class="dex-left" v-if="selectedPokemon">
      <div class="top-nav">
        <PokedexMiniNav :pokemon="prevPokemon" side="left" @updatePokemon="updatePokemonOnRoute(`${prevPokemon.id}`)" />
      </div>
      <div class="pokemon-view w-full h-92 flex justify-center">
        <img class="" :src="getImageUrl(selectedPokemon)" :alt="selectedPokemon.name">
      </div>
      <div class="poke-info">
        <h1 class="text-4xl m-2 capitalize text-white font-bold">
          #{{ selectedPokemon.id }} {{ selectedPokemon.name && selectedPokemon.name.replace("-", " ") }}
        </h1>
        <div class="text-2xl" v-if="selectedPokemon.species">
          {{ selectedPokemon.species.genus }}
        </div>
      </div>
    </div>
    <div class="dex-left off" v-else>
      <div class="top-nav">
        <div class="preview-loading">&nbsp;</div>
      </div>
      <div class="pokemon-view"></div>
      <div class="poke-info m-4 flex-grow">
        <div class="preview-loading">&nbsp;</div>
      </div>
    </div>
    <div class="dex-right" v-if="selectedPokemon">
      <div class="top-nav">
        <PokedexMiniNav v-if="nextPokemon" :pokemon="nextPokemon" side="right"
          @updatePokemon="updatePokemonOnRoute(`${nextPokemon.id}`)" />
      </div>
      <div class="pokemon-view w-full h-92 text-red-800 font-bold" v-if="selectedPokemon">
        <div class="my-1 pb-2" v-for="flavor of selectedPokemon.specy.flavor.slice(0, 4)"
          :key="`flavor-text-${flavor.game.name}`">
          {{ cleanUpFlavorText(flavor.flavor_text) }} -
          <span class="capitalize">Pokemon {{ flavor.game.name }}</span>
        </div>
      </div>
      <div class="stats flex justify-between w-full font-bold" v-if="selectedPokemon">
        <div class="m-2 px-2">Height: {{ selectedPokemon.height }}</div>
        <div class="m-2 px-2">Weight: {{ selectedPokemon.weight }}</div>
      </div>
      <div class="types flex justify-between w-full font-bold" v-if="selectedPokemon && selectedPokemon.types">
        <TypeSymbol
          v-for="pokeType of selectedPokemon.types"
          :key="`type-${pokeType}`"
          :pokeTypeName="pokeType.type.name"
          shape="squared"
          size="medium"
          :showName="true"
        />
      </div>
    </div>
    <div class="dex-right off" v-else>
      <div class="top-nav">
        <div class="preview-loading">&nbsp;</div>
      </div>
      <div class="pokemon-view"></div>
      <div class="poke-info m-4 flex-grow">
        <div class="preview-loading">&nbsp;</div>
      </div>
    </div>
  </div>


</template>

<style scoped>
  .pokedex-detail {

    .dex-left,
    .dex-right {
      display: flex;
      flex-direction: column;
      margin: 0.5rem;
      padding: 0.5rem;
      width: clamp(12rem, 50vw, 24rem);
      border: 0.5rem solid #af0b0b;
      background-color: #880000;
      min-height: 34rem;
    }

    .pokemon-view {
      padding: 0.5rem 1rem;
      background: linear-gradient(#b9e0de 25%, #73c0bc);
      min-height: 20rem;
      img {
        height: max-content;
      }
    }

    .top-nav {
      padding: 0.5rem;
      margin: 0.5rem;
      min-height: 4rem;
    }

    @media screen and (max-width: 42rem) {
      flex-direction: column;
      align-items: center;

      .dex-left,
      .dex-right {
        width: clamp(12rem, 90vw, 24rem);
      }
    }
  }
</style>
