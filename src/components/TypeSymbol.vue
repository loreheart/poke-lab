<script setup lang="ts">
  import { gameTypeIcon, getPokeType } from '../helpers'
  import { pokeTypes } from '../data'

  const props = defineProps({
    pokeTypeName: {
      type: String,
      required: true,

      validator: (pokeTypeName: string) => {
        const typeNames = pokeTypes.map(({ name }) => name)
        return typeNames.includes(pokeTypeName)
      }
    },
    size: {
      type: String,
      required: false,
      default: () => 'medium',
      
      validator: (size: string) => {
        return ['mini', 'small', 'medium', 'large'].includes(size)
      }
    },
    shape: {
      type: String,
      required: false,
      default: () => 'squared',
      
      validator: (shape: string) => {
        return ['squared', 'circular'].includes(shape)
      }
    },
    showName: {
      type: Boolean,
      required: false,
      default: () => true,
    }
  })

  const loadSizeClass = () => {
    return {
      'mini': `h-8 w-8`,
      'small': `h-12 w-12`,
      'medium': `h-14 w-32`,
      'large': `h-26 w-44`,
    }[props.size]
  }

  const loadShapeClass = () => {
    return {
      'squared': 'rounded-none',
      'circular': 'rounded-full',
    }[props.shape]
  }
</script>

<template>
  <div class="min-w-max m-2 py-1 px-1 gap-2 capitalize text-xl flex justify-center content-center"
    :class="`${loadSizeClass()} ${loadShapeClass()}`"
    v-if="pokeTypeName" :style="{ backgroundColor: getPokeType(pokeTypeName).color }">
    <img class="h-full" :src="gameTypeIcon(pokeTypeName)" :alt="pokeTypeName">
    <div v-if="showName" class="flex flex-col justify-center">{{ pokeTypeName }}</div>
  </div>
</template>

<style scoped>

</style>
