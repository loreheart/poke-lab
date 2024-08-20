import { capitalize } from 'vue'

export const getBulbaPageUrl = (inputString: string, inputType = 'page') => {
  let pageName
  if (inputType === 'name') {
    const POKEMON = 'Pok%C3%A9mon'
    pageName = `${capitalize(inputString)}_(${POKEMON})`
  } else {
    pageName = inputString
  }
  const apiUrlRoot = 'https://bulbapedia.bulbagarden.net/w/api.php'
  const queryConfig = 'action=parse&format=json'
  return `${apiUrlRoot}?${queryConfig}&page=${pageName}`
}
