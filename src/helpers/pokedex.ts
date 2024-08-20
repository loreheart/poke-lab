import { Pokemon, PokemonFull, PokemonSpeciesResponse, PokemonGeneration } from "../types"

import { bifrostUrl } from '../config/assets'
import { generations, pokeTypes } from '../data/poke-data'
import { makeUrlFriendly } from './general'

export const getBigBulbaImg = (pokemon: Pokemon) => {
  const urlRoot = `${bifrostUrl}/projects/pokedex/bulbapedia`
  const idString: string = `${pokemon.id}`.padStart(4, '0')
  const urlFriendlyName = makeUrlFriendly(pokemon.name)

  return `${urlRoot}/${idString}%20${urlFriendlyName}.png`
}

export const gameTypeIcon = (typename: string) => {
  return `${bifrostUrl}/projects/pokedex/icons/gen-9-types-white/${typename && typename.toLowerCase()}.png`
}

export const getPokeType = (pokeTypeName: string) => {
  return pokeTypes.find(pokeType => pokeType.name === pokeTypeName) || pokeTypes[0]
}

// Clean up wierd invisible arrow characters
// https://stackoverflow.com/questions/63182789/arrows-in-api-strings
export const cleanUp = (sentence: string) => {
  return sentence.replace('\n', ' ').replace(String.fromCharCode(12)," ")
}

export const splitForms = ({ pokemon, species }: PokemonSpeciesResponse): PokemonFull => {
  const mainPokemon = pokemon[0]

  return {
    ...mainPokemon,
    species: species[0],
    altForms: pokemon.slice(1) || [],
  }
}

export const pokemonIsFromRegion = (pokemon: Pokemon, regionName: string) => {
  const activeGen = generations.find(gen => gen.region === regionName) as PokemonGeneration 

  return pokemon.id >= activeGen.first && pokemon.id <= activeGen.last
}