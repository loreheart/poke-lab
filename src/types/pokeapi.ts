export interface DexOption {
  id: number
  name: string
  dexnum: number[]
}

export interface APILink {
  name: string
  url: string
}

export interface DexData {
  id: number
  name: string
  is_main_series: boolean
  descriptions: {
    description: string
    language: APILink[]
  }[]
  names: {
    name: string,
    language: APILink[]
  }[]
  pokemon_entries: {
    entry_number: number
    pokemon_species: APILink
    name?: string
    id?: number
    types?: {
      type: {
        name: string
      }
    }[]
  }[]
  region: APILink
  version_groups: APILink[]
}

export interface Pokedex {
  name: string
  dexnum: number[]
  dexData: DexData[]
  progress: string[]
}