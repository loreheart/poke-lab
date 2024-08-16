import { PokemonGeneration, PokemonType } from "../types"

export const pokeTypes: PokemonType[] = [
  {
    id: 1,
    name: "normal",
    color: "#AAB09F"
  },
  {
    id: 2,
    name: "fighting",
    color: "#CB5F48"
  },
  {
    id: 3,
    name: "flying",
    color: "#7DA6DE"
  },
  {
    id: 4,
    name: "poison",
    color: "#B468B7"
  },
  {
    id: 5,
    name: "ground",
    color: "#CC9F4F"
  },
  {
    id: 6,
    name: "rock",
    color: "#B2A061"
  },
  {
    id: 7,
    name: "bug",
    color: "#94BC4A"
  },
  {
    id: 8,
    name: "ghost",
    color: "#846AB6"
  },
  {
    id: 9,
    name: "steel",
    color: "#89A1B0"
  },
  {
    id: 10,
    name: "fire",
    color: "#EA7A3C"
  },
  {
    id: 11,
    name: "water",
    color: "#539AE2"
  },
  {
    id: 12,
    name: "grass",
    color: "#71C558"
  },
  {
    id: 13,
    name: "electric",
    color: "#E5C531"
  },
  {
    id: 14,
    name: "psychic",
    color: "#E5709B"
  },
  {
    id: 15,
    name: "ice",
    color: "#70CBD4"
  },
  {
    id: 16,
    name: "dragon",
    color: "#6A7BAF"
  },
  {
    id: 17,
    name: "dark",
    color: "#736C75"
  },
  {
    id: 18,
    name: "fairy",
    color: "#E397D1"
  }
]

export const generations: PokemonGeneration[] = [
  {
    id: 1,
    region: "Kanto",
    code: "generation-i",
    games: "Red & Blue",
    first: 1,
    last: 151
  },
  {
    id: 2,
    region: "Johto",
    code: "generation-ii",
    games: "Gold & Silver",
    first: 152,
    last: 251
  },
  {
    id: 3,
    region: "Hoenn",
    code: "generation-iii",
    games: "Ruby & Sapphire",
    first: 252,
    last: 386
  },
  {
    id: 4,
    region: "Sinnoh",
    code: "generation-iv",
    games: "Diamond & Pearl",
    first: 387,
    last: 494
  },
  {
    id: 5,
    region: "Unova",
    code: "generation-v",
    games: "Black & White",
    first: 495,
    last: 649
  },
  {
    id: 6,
    region: "Kalos",
    code: "generation-vi",
    games: "X & Y",
    first: 650,
    last: 721
  },
  {
    id: 7,
    region: "Alola",
    code: "generation-vii",
    games: "Sun & Moon",
    first: 722,
    last: 809
  },
  {
    id: 8,
    region: "Galar",
    code: "generation-viii",
    games: "Sword & Shield",
    first: 810,
    last: 905
  },
  {
    id: 9,
    region: "Paldea",
    code: "generation-ix",
    games: "Scarlet & Violet",
    first: 906,
    last: 1025
  }
]