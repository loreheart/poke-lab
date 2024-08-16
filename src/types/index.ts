export interface PokemonType {
  name: string
}

export interface Type {
  type: PokemonType
}

export interface Pokemon {
  id?: number
  name?: string
  types?: Type[]
  previous?: Pokemon | null
  next?: Pokemon | null
}


export interface NavItem {
  text: string
  link: string
}