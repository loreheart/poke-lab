import { Pokemon } from "../types"
import { bifrostUrl } from '../config/assets'
import { pokeTypes } from '../data/poke-data'
import { makeUrlFriendly } from './general'


export const getBigBulbaImg = (pokemon: Pokemon) => {
  const urlRoot = `${bifrostUrl}/projects/pokedex/bulbapedia`

  if(!pokemon) {
    return ''
  }
  
  const idString: string = `${pokemon.id}`.padStart(4, '0')
  const urlFriendlyName = makeUrlFriendly(pokemon.name)

  return `${urlRoot}/${idString}%20${urlFriendlyName}.png`
}

export const gameTypeIcon = (typename: string) => {
  return `${bifrostUrl}/projects/pokedex/icons/gen-9-types-white/${typename.toLowerCase()}.png`
}

export const getPokeType = (pokeTypeName: string) => {
  return pokeTypes.find(pokeType => pokeType.name === pokeTypeName)
}

// Clean up wierd invisible arrow characters
// https://stackoverflow.com/questions/63182789/arrows-in-api-strings
export const cleanUp = (sentence: string) => {
  return sentence.replace('\n', ' ').replace(String.fromCharCode(12)," ")
}