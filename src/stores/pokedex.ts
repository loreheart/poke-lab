import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { Pokemon, PokemonSpeciesResponse } from '../types/index'
import pokedexData from '../data/pokedex-with-types.json'
import { getPrevAndNext } from '../helpers'
import pokemon_by_national_id from '../queries/pokemon_by_national_id.gql'

export const usePokedexPageStore = defineStore('pokedex-page', () => {
  let loaded = false
  const pokedex = ref()
  const selected = ref()

  const loadPokedex = (): Pokemon[] => {
    const { pokemon }: { pokemon: Pokemon[] } = pokedexData
    if(!loaded) {
      console.warn("LOADING pokedexData", pokedexData.pokemon.length)
      console.warn("^ this should only happen once!")
      
      pokedex.value = pokemon

      loaded = true
    }
    return pokedex.value
  }

  const loadFullPokemon = async (dexNum: number) => {
    const query = gql`${pokemon_by_national_id}`
    const { result } = useQuery(query, { pokemon_species_id: dexNum })

    watch(
      () => result.value,
      (result: PokemonSpeciesResponse) => {
        const mainPokemon = result.pokemon[0]
        const species = result.species[0]

        selected.value = {
          ...mainPokemon,
          species,
          altForms: result.pokemon.slice(1) || [],
        }
        console.log(selected)
        
        return selected
      }
    )
  }

  const loadPokemon = (dexNum: number): Pokemon => {
    loadFullPokemon(dexNum)
    return getPrevAndNext(loadPokedex(), dexNum)
  }

  return {
    pokedex,
    selected,
    loadPokedex,
    loadPokemon,
    loadFullPokemon
  }
})