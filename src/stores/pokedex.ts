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
    loadPokemon(dexNum: number | string): Pokemon {
      const pokedex = this.loadPokedex()

      const dexNumInt = parseInt(`${dexNum}`)
      
      let previous = null
      let next = null

      const hasPrevious = (dexNumInt > 1 && dexNumInt <= 1025)
      const hasNext = (dexNumInt >= 1 && dexNumInt < 1025)
      
      if (hasPrevious) {
        const prevId = +dexNumInt - 1
        previous = pokedex[prevId - 1]
      }

      if (hasNext) {
        const nextId = +dexNumInt + 1
        next = pokedex[nextId - 1]
      }

      const pokemon = {
        ...pokedex[+dexNumInt - 1],
        previous,
        next,
      }

      return pokemon
    }
  }
})