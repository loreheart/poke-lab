import { defineStore } from 'pinia'
import { ref, Ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { Pokemon, PokemonSpeciesResponse } from '../types/index'
import pokedexData from '../data/pokedex-with-types.json'
import { getPrevAndNext } from '../helpers'
import pokemon_by_national_id from '../queries/pokemon_by_national_id.gql'

export const usePokedexPageStore = defineStore('pokedex-page', () => {
  let loaded = false
  const pokedex: Ref<Pokemon[]> = ref([])
  const speciesData: Ref<PokemonSpeciesResponse | undefined> = ref()

  const loadPokedex = (): Pokemon[] => {
    if(!loaded) {
      console.log("LOADING pokedexData", pokedexData.pokemon.length)
      console.log("^ this should only happen once!")

      const { pokemon }: { pokemon: Pokemon[] } = pokedexData
      
      pokedex.value = pokemon

      loaded = true
    }
    return pokedex.value
  }

  const loadSpeciesData = (dexNum: number | string) => {
    const query = gql`${pokemon_by_national_id}`
    const { result } = useQuery(query, { pokemon_species_id: dexNum })

    watch(
      () => result,
      (result: Ref<PokemonSpeciesResponse>) => {
        speciesData.value = result.value as PokemonSpeciesResponse
      }
    )
  }

  const loadPokemon = (dexNum: number | string): Pokemon => {
    loadSpeciesData(dexNum)
    return getPrevAndNext(loadPokedex(), dexNum)
  }

  return {
    pokedex,
    loadPokedex,
    loadPokemon
  }
})