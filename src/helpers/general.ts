import { capitalize } from 'vue'

export const makeUrlFriendly = (name: string) => {
  return `${name}`.split('-').map(namePart => {
    return capitalize(namePart)
  }).join('%20')
}

export const getItem = <T,>(
  items: T[],
  index: number | string,
  last: number = 1025
) => {
  const indexInt = parseInt(`${index}`)
  
  if (indexInt >= 1 && indexInt <= last) {
    return items[indexInt]
  }
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
    return items[+indexInt - 1 + 1]
  }
}

export const getItemsByDataPage = <T>(
  items: T[],
  page = 1,
  perPage = 10
): T[] => {
  const startIndex = (page - 1) * perPage + 1
  const endIndex = startIndex + (perPage - 1)
  if (Array.isArray(items) && items.length >= startIndex) {
    return items.slice(startIndex, endIndex)
  }
  return []
}