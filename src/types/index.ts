export interface PokemonType {
  name: string
}

export interface Type {
  type: PokemonType
}

export interface Pokemon {
  id: number
  name: string
  types: Type[]
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
  specy: PokemonSpecs[]
  stats: PokemonStats[]
  abilities: PokemonAbilities[]
}

export interface PokemonSpeciesData {
  name: string
  genus: string
}


export interface PokemonSpeciesResponse {
  species: PokemonSpeciesData
  pokemon: PokemonFull
  altForms?: PokemonFull[]
}

export interface NavItem {
  text: string
  link: string
}