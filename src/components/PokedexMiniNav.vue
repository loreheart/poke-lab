<script setup lang="ts">
  import type { PropType } from 'vue'

  import { Pokemon } from '../types/index'
  import { getBigBulbaImg } from '../helpers'

  const props = defineProps({
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
    },
    side: {
      type: String,
      default: 'right',
      required: false,

      validator: (side: string) => ['left', 'right'].includes(side)
    }
  })

  const pokemonImg = (pokemon: Pokemon) => getBigBulbaImg(pokemon)
</script>

<template>
  <div v-if="pokemon" class="flex content-center justify-center gap-4" @click="$emit('updatePokemon', { ...pokemon })">
    <div v-if="props.side === 'left'" class="mt-2">
      <i class="arrow left h-4 w-4 mt-2"></i>
    </div>
    <img v-if="props.side === 'right'" class="pokemon-view h-12 w-12 rounded-full"
      :src="pokemonImg(pokemon)" :alt="pokemon.name">
    <div class="text-xl font-bold capitalize cursor-pointer content-center">
      #{{ pokemon.id }} {{ pokemon.name.replace("-", " ") }}
    </div>
    <img v-if="props.side === 'left'" class="pokemon-view h-12 w-12 rounded-full"
      :src="pokemonImg(pokemon)" :alt="pokemon.name">
    <div v-if="props.side === 'right'" class="mt-2">
      <i class="arrow right h-4 w-4 mt-2"></i>
    </div>
  </div>
</template>

<style scoped>
  .pokemon-view {
    background: linear-gradient(#b9e0de 25%, #73c0bc)
  }
</style>
