import { defineStore } from 'pinia'

import { Pokemon } from '../types/index'
import pokedexData from '../data/pokedex-with-types.json'

interface PokedexPageStore {
  loaded: boolean
  pokedex: Pokemon[]
}

export const usePokedexPageStore = defineStore('pokedex-page', {
  state: () => ({
    loaded: false,
    pokedex: []
  } as PokedexPageStore),
  actions: {
    loadPokedex(): Pokemon[] {
      if(!this.loaded) {
        console.log("LOADING pokedexData", pokedexData)
        console.log("^ this should only happen once!")
  
        const { pokemon }: { pokemon: Pokemon[] } = pokedexData
        
        this.pokedex = pokemon

        this.loaded = true
      }
      return this.pokedex
    },
    loadPokemon(dexNum: number): Pokemon {
      this.loadPokedex()
      
      let previous = null
      let next = null

      const hasPrevious = (dexNum > 1 && dexNum <= 1025)
      const hasNext = (dexNum >= 1 && dexNum < 1025)
      
      if (hasPrevious) {
        previous = this.pokedex[dexNum - 1 - 1]
      }

      if (hasNext) {
        next = this.pokedex[dexNum + 1 - 1]
      }

      const pokemon = {
        ...this.pokedex[dexNum - 1],
        previous,
        next,
      }
      console.log(pokemon)

      return pokemon
    }
  }
})