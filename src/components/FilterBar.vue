<script setup lang="ts">
  import type { PropType } from 'vue'

  defineProps({
    title: {
      type: String,
      required: false,
      default: () => ''
    },
    options: {
      type: Array as PropType<Array<number | string>>,
      required: false,
      default: () => []
    },
    selected: {
      type: [ String, Number ],
      required: false,
      default: () => ''
    }
  })
</script>

<template>
  <div class="w-min flex w-auto gap-2 py-1 px-4 my-2 mx-auto justify-center bg-poke-red-3 rounded-full">
    <div class="title px-0 my-1">{{ title }}</div>
    <div class="item" v-for="count in options"
      :key="`limit-count-${count}`"
      :class="`${count === selected ? 'text-poke-yellow-2 font-bold' : ''}`">
      <button class="px-1 my-1" @click="$emit('selectOption', count)">{{ count }}</button>
    </div>
  </div>
</template>

<style scoped>
  .item button:hover {
    background-color: #fff;
    border-radius: 100%;
    color: #880000;
    /* font-weight: bold; */
  }
</style>
