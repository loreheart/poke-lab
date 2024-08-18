export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const makeUrlFriendly = (name: string) => {
  console.log(name)
  return `${name}`.split('-').map(namePart => {
    return capitalize(namePart)
  }).join('%20')
}

export const getPrevItem = <T,>(
  items: T[],
  index: number | string,
  last: number = 1025
) => {
  const indexInt = parseInt(`${index}`)
  
  if (indexInt > 1 && indexInt <= last) {
    return items[+indexInt - 1 - 1]
  }
}

export const getNextItem = <T,>(
  items: T[],
  index: number | string,
  last: number = 1025
) => {
  const indexInt = parseInt(`${index}`)
  
  if (indexInt >= 1 && indexInt < last) {
    return items[+indexInt - 1 - 1]
  }
}
