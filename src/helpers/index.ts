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

export const getPrevAndNext = (
  pokedex: Pokemon[],
  dexNum: number | string
): Pokemon => {
  let previous = null, next = null
  const dexNumInt = parseInt(`${dexNum}`)

  const hasPrevious = (dexNumInt > 1 && dexNumInt <= 1025)
  const hasNext = (dexNumInt >= 1 && dexNumInt < 1025)

  const pokemon = pokedex[+dexNumInt - 1]
  
  if (hasPrevious) {
    const prevId = +dexNumInt - 1
    previous = pokedex[prevId - 1]
  }

  if (hasNext) {
    const nextId = +dexNumInt + 1
    next = pokedex[nextId - 1]
  }
  return {
    ...pokemon,
    previous,
    next,
  }
}