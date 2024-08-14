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
    }
  }
})