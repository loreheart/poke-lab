<script setup lang="ts">
  import type { PropType } from 'vue'
  import { Pokemon } from '../types/index'

  defineProps({
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true,

      validator: ({ id, name, types }: Pokemon) => {
        const dexNum: number = parseInt("" + id)
        const validId = dexNum > 0 && dexNum <= 1025
        const hasName = typeof name === 'string' && name.length > 0
        const hasType = types.length > 0
        
        return validId && hasName && hasType
      }
    }
  })
</script>

<template>
  <div>{{ pokemon.id }}: {{ pokemon.name }}</div>

</template>

<style scoped>

</style>
