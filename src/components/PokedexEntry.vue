<script setup lang="ts">
  defineProps({
    dexnum: {
      type: String,
      required: true,

      validator: (value: string) => {
        const dexNum: number = parseInt(value)
        
        return dexNum > 0 && dexNum <= 1025 
      }
    }
  })
</script>

<template>
  <h1>{{ dexnum }}</h1>

</template>

<style scoped>

</style>
