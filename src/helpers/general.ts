export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const makeUrlFriendly = (name: string) => {
  return name.split('-').map(namePart => {
    return capitalize(namePart)
  }).join('%20')
}

export const getPrevAndNext = <T,>(
  items: T[],
  index: number | string,
  last: number = 1025
): T => {
  let previous = null, next = null
  const indexInt = parseInt(`${index}`)

  const item = items[+indexInt - 1]
  
  if (indexInt > 1 && indexInt <= last) {
    const prevId = +indexInt - 1
    previous = items[prevId - 1]
  }

  if (indexInt >= 1 && indexInt < last) {
    const nextId = +indexInt + 1
    next = items[nextId - 1]
  }
  return {
    ...item,
    previous,
    next,
  }
}
