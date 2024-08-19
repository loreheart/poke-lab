import { capitalize } from 'vue'
import { axios } from 'axios'

export const getBulbaPageUrl = (pageName: string) => {
  const apiUrlRoot = 'https://bulbapedia.bulbagarden.net/w/api.php'
  const queryConfig = 'action=parse&format=json'
  return `${apiUrlRoot}?${queryConfig}&page=${pageName}`
}

export const getPokeBulbaPageUrlByName = (pokemonName: string) => {
  const POKEMON = 'Pok%C3%A9mon'
  const pageName = `${capitalize(pokemonName)}_(${POKEMON})`
  return getBulbaPageUrl(pageName)
}

