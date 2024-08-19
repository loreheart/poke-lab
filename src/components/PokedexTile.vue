<script setup lang="ts">
  import type { PropType } from 'vue'

  import TypeSymbol from '../components/TypeSymbol.vue'
  import { Pokemon } from '../types'

  defineProps({
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true,

      validator: ({ id, name, types }: Pokemon) => {
        const dexNum: number = parseInt("" + id)
        const validId = dexNum > 0 && dexNum <= 1025
        const hasName = typeof name === 'string' && name.length > 0
        const hasType = types && types.length > 0
        
        return validId && hasName && hasType
      }
    }
  })

  const spriteUrl = "https://img.pokemondb.net/sprites/scarlet-violet/icon/"

  const spriteByPokemon = (name: string) => {
    return `${spriteUrl}${name}.png`
  }

</script>

<template>
  <div class="pokemon-tile pokeball-shaped"
        @click="$emit('selectPokemon', pokemon)">
    <div class="sprite scale-110">
      <img
        :src="spriteByPokemon(pokemon.name)"
        :alt="pokemon.name"
      />
    </div>
    <div class="title-box pokeball-shaped">
      <div class="title-text">
        #{{ pokemon.id }} {{ pokemon.name.replace("-", " ") }}
      </div>
    </div>
    <div class="type-symbols">
      <TypeSymbol
        class="icon"
        v-for="pokeType of pokemon.types"
        :key="`type-${pokeType}`"
        :pokeTypeName="pokeType.type.name"
        shape="circular"
        size="mini"
        :showName="false"
      />
    </div>
  </div>

</template>

<style scoped>
  .pokemon-tile {
    text-align: center;
    font-weight: bold;
    position: relative;
    background: linear-gradient(#b9e0de 25%, #73c0bc);
    border: 2px solid #111;
    margin: 1rem 1rem 2rem;
    box-shadow: 8px 4px 8px #111;
    cursor: pointer;
    &:hover {
      transition: all 0.1s linear;
      transform: scale(1.1);
      cursor: pointer;
    }
    .sprite {
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .title-box {
      position: absolute;
      top: 0;
      right: -2px;
      cursor: pointer;
      background: linear-gradient(
        transparent 10%,
        #af0b0b 10%,
        #af0b0b 25%,
        transparent 25%
      );
      .title-text {
        text-transform: capitalize;
        color: #fff;
        position: absolute;
        top: 18px;
        left: 0;
        right: 0;
        margin: 0;
      }
    }
    .type-symbols .icon {
      position: absolute;
    }
    .type-symbols .icon:first-child {
      bottom: 1rem;
      right: -1rem;
    }
    .type-symbols .icon:not(:first-child) {
      bottom: -1rem;
      right: 1rem;
    }
  }

</style>
