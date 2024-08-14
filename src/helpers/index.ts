import { Pokemon } from "../types"

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getBigBulbaImg = (pokemon: Pokemon) => {
  const urlRoot = "https://bifrost.loreheart.com/projects/pokedex/bulbapedia"

  if(!pokemon) {
    return ''
  }
  
  const idString: string = `${pokemon.id}`.padStart(4, '0')
  const urlFriendlyName = pokemon.name.split('-').map(namePart => {
    return capitalize(namePart)
  }).join('%20')

  return `${urlRoot}/${idString}%20${urlFriendlyName}.png`
}