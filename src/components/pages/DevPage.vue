<script setup lang="ts">
  import { ref, capitalize as vueCap } from 'vue'
  import { getPokeBulbaPageUrlByName } from '../../helpers'

  console.log(getPokeBulbaPageUrlByName('bulbasaur'))

  const inputText = ref('')

  const selectedMode = ref('page')
  const modes = ref(['page', 'pokemon-name', 'id'])

  // const loadUrlFromInput = () => {

  // }

  const capitalize = vueCap


</script>

<template>
  <div>
    <h1 class="text-2xl my-4 text-poke-blue-2">Data Workstation</h1>
    <h2 class="text-xl my-2 text-poke-blue-1">Bulbapedia API Disco</h2>
    <section>
      <h3 class="text-base m-2 text-poke-green-1">Query Builder</h3>
      <div class="query-box flex flex-col gap-2">
        <fieldset class="flex gap-4 justify-center">
          <label class="modes" v-for="mode in modes">
            <input type="checkbox" v-model="selectedMode">
            {{  capitalize(mode) }}
          </label>
        </fieldset>
        <fieldset>
          <input type="text" v-model="inputText"> 
        </fieldset>
        <div>
        </div>
      </div>

    </section>
  </div>
</template>

<style scoped>

</style>