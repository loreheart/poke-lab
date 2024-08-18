import { defineStore } from 'pinia'
import { ref, watch, Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { NationalDex, Pokemon, PokemonFull, PokemonSpeciesResponse } from '../types/index'
import pokedexData from '../data/pokedex-with-types.json'
import { getItemWithPrevAndNext } from '../helpers'
import pokemon_by_national_id from '../queries/pokemon_by_national_id.gql'
import { useLocalStorageStore } from './localStorage'

export const usePokedexPageStore = defineStore('pokedex-page', () => {
  let pokedexLoaded = false

  const localStorageStore = useLocalStorageStore()
  const hasLocalStorage = localStorageStore.ready

  const pokedex = ref()
  const nationalDex: Ref<NationalDex> = ref({})
  const selected = ref()
  
  // For persisting full pokedex data, nationalIds as index
  const addToNationalDex = (newPokemon: PokemonFull): PokemonFull => {
    nationalDex.value[newPokemon.id] = newPokemon
    if (hasLocalStorage) {
      console.log('saving national dex to local storage')
      localStorageStore.setItem('national-dex', nationalDex.value)
    }
    return newPokemon
  }

  const hasNationalDexData = (dexNum: number): boolean => {
    return !!nationalDex.value[dexNum]
  }

  const loadPokedex = (): Pokemon[] => {
    const { pokemon }: { pokemon: Pokemon[] } = pokedexData
    if(!pokedexLoaded) {
      pokedex.value = pokemon
      pokedexLoaded = true
    }
    return pokedex.value
  }

  const splitForms = ({ pokemon, species }: PokemonSpeciesResponse): PokemonFull => {
    const mainPokemon = pokemon[0]

    return {
      ...mainPokemon,
      species: species[0],
      altForms: pokemon.slice(1) || [],
    }
  }

  const loadFullPokemon = async (dexNum: number) => {
    const query = gql`${pokemon_by_national_id}`
    const { result } = await useQuery(query, { pokemon_species_id: dexNum })

    watch(
      () => result.value,
      ({ pokemon, species }: PokemonSpeciesResponse) => {
        const newPokemon: PokemonFull = splitForms({ pokemon, species })
        addToNationalDex(newPokemon)
        selected.value = newPokemon
        console.log(newPokemon)
        return newPokemon
      }
    )
  }

  const loadPokemon = (dexNum: number): Pokemon | undefined => {
    if (!hasNationalDexData(dexNum)) {
      loadFullPokemon(dexNum)
    }
    const pokedex = loadPokedex()
    return pokedex.find(poke => poke.id === dexNum)
  }

  return {
    pokedex,
    selected,
    loadPokedex,
    loadPokemon,
    loadFullPokemon
  }
})