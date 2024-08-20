import { defineStore } from 'pinia'
import { ref, watch, Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { NationalDex, Pokemon, PokemonFull, PokemonSpeciesResponse } from '../types'
import pokedexData from '../data/pokedex-with-types.json'
import pokemon_by_national_id from '../queries/pokemon_by_national_id.gql'
import { useLocalStorageStore } from './local-storage-store'
import { splitForms } from '../helpers'

export const usePokedexStore = defineStore('pokedex-page', () => {
  let pokedexLoaded = false

  const localStorageStore = useLocalStorageStore()
  const hasLocalStorage = localStorageStore.ready

  const pokedex = ref()
  const nationalDex: Ref<NationalDex> = ref({})
  const selected = ref()
  
  // For persisting full pokedex data, nationalIds as index
  const addToNationalDex = (newPokemon: PokemonFull): PokemonFull => {
    if (!nationalDex.value) {
      nationalDex.value = {}
    }
    nationalDex.value[newPokemon.id] = newPokemon
    if (hasLocalStorage) {
      localStorageStore.setItem('national-dex', nationalDex.value)
    }
    return newPokemon
  }

  const loadLocalNationalDex = () => {
    if (hasLocalStorage) {
      nationalDex.value = localStorageStore.loadItem('national-dex')
    }
  }

  const hasNationalDexData = (dexNum: number): boolean => {
    return nationalDex.value && !!nationalDex.value[dexNum]
  }

  const loadPokedex = (): Pokemon[] => {
    console.log('check loadPokedex')
    const { pokemon }: { pokemon: Pokemon[] } = pokedexData
    if(!pokedexLoaded) {
      pokedex.value = pokemon
      pokedexLoaded = true
      console.log('ACTUAL loadPokedex')
    }
    return pokedex.value
  }


  const loadFullPokemon = async (dexNum: number) => {
    if (hasNationalDexData(dexNum)) {
      console.log('loadFullPokemon CACHED', dexNum)
      return loadCachedFullPokemon(dexNum)
    }
    console.log('loadFullPokemon NEW', dexNum)
    const query = gql`${pokemon_by_national_id}`
    const { result } = await useQuery(query, { pokemon_species_id: dexNum })

    watch(
      () => result.value,
      ({ pokemon, species }: PokemonSpeciesResponse) => {
        const newPokemon: PokemonFull = splitForms({ pokemon, species })

        addToNationalDex(newPokemon)
        selected.value = newPokemon
        return newPokemon
      }
    )
  }

  const loadCachedFullPokemon = (dexNum: number): PokemonFull => {
    console.log('loadCachedFullPokemon', dexNum, nationalDex.value[+dexNum])
    const cachedPokemon = nationalDex.value[+dexNum]
    selected.value = cachedPokemon
    return cachedPokemon
  }

  const loadPokemon = (dexNum: number): Pokemon | undefined => {
    console.log('loadPokemon', dexNum)
    const pokedex = loadPokedex()
    return pokedex.find(poke => poke.id === dexNum)
  }

  return {
    pokedex,
    selected,
    nationalDex,
    loadPokedex,
    loadPokemon,
    loadFullPokemon,
    loadLocalNationalDex,
  }
})