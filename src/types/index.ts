export interface PokemonType {
  name: string;
}

export interface Type {
  type: PokemonType;
}

export interface Pokemon {
  id: number;
  name: string;
  types: Type[];
}


export interface NavItem {
  text: String
  link: String
}