export interface PokemonType {
  id?: number
  name: string
  color?: string
}

export interface PokemonGeneration {
  id: number
  region: string
  code: string
  games: string
  first: number
  last: number
}

export interface Pokemon {
  id: number
  name: string
  types: {
    type: PokemonType
  }[]
  previous?: Pokemon | null
  next?: Pokemon | null
}

export interface PokemonEggGroup {
  egggroup: {
    egggroup: {
      name: string
    }
  }
}

export interface PokemonFlavorText {
  flavor_text: string
  game: {
    name: string
  }
}

export interface PokemonSpecs {
  gender_rate: number
  is_legendary: boolean
  is_mythical: boolean
  capture_rate: number
  generation_id: number
  is_baby: boolean
  eggroups: PokemonEggGroup[]
  flavor: PokemonFlavorText[]
}

export interface PokemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string
  }
}

export interface PokemonAbilities {
  ability: {
    name: string
  }
}

export interface PokemonFull extends Pokemon {
  height: number
  weight: number
  is_default: boolean
  specy: PokemonSpecs
  stats: PokemonStats[]
  abilities: PokemonAbilities[]
  species?: PokemonSpecies
  altForms?: PokemonFull[]
}

export interface NationalDex {
  [id: string]: PokemonFull
}

export interface PokemonSpecies {
  name: string
  genus: string
}

export interface PokemonSpeciesResponse {
  species: PokemonSpecies[]
  pokemon: PokemonFull[]
}
