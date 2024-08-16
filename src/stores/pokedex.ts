import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import { Pokemon } from '../types/index'
import pokedexData from '../data/pokedex-with-types.json'
import { getPrevAndNext } from '../helpers'

export const usePokedexPageStore = defineStore('pokedex-page', () => {
  let loaded = false
  let pokedex: Ref<Pokemon[]> = ref([])

  const loadPokedex = (): Pokemon[] => {
    if(!loaded) {
      console.log("LOADING pokedexData", pokedexData)
      console.log("^ this should only happen once!")

      const { pokemon }: { pokemon: Pokemon[] } = pokedexData
      
      pokedex.value = pokemon

      loaded = true
    }
    return pokedex.value
  }

  const loadPokemon = (dexNum: number | string): Pokemon => {
    console.log('loadPokemon')
    const pokedex = loadPokedex()

    return getPrevAndNext(pokedex, dexNum)
  }

  return {
    pokedex,
    loadPokedex,
    loadPokemon
  }
})