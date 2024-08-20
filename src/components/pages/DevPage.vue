<script setup lang="ts">
  import { computed, ref, capitalize } from 'vue'

  import { getBulbaPageUrl } from '../../helpers'
  import { usePokedexStore, useBulbaStore } from '../../stores'
  import { Pokemon } from '../../types'

  const selectedMode = ref('page')
  const modes = ref(['page', 'name'])
  const inputText = ref('')
  const showParams = ref(false)

  const urlFromInput = computed(() => {
    return getBulbaPageUrl(inputText.value, selectedMode.value)
  })

  const pokedex = ref()
  const pokedexStore = usePokedexStore()
  pokedex.value = pokedexStore.loadPokedex()

  const bulbaStore = useBulbaStore()
  const loadBulbaPage = () => bulbaStore.loadBulbaPage(urlFromInput.value)

  const bulbaPageKeys = computed(() => {
    return bulbaStore.savedPageKeys
  })

  const dataItems = computed(() => {
    return pokedex.value.filter(
      (pokemon: Pokemon) => pokemon.name.includes(inputText.value)
    ).slice(0, 10).map((pokemon: Pokemon) => pokemon.name)
  })
</script>

<template>
  <div class="flex flex-col flex-wrap content-center justify-center">
    <h1 class="text-2xl my-4 text-poke-blue-1">Data Workstation</h1>
    <h2 class="text-xl my-2 text-poke-blue-1">Bulbapedia API Disco</h2>
    <form>
      <h3 class="text-base m-2 text-poke-blue-1">Query Builder</h3>
      <fieldset class="flex gap-4 justify-center">
        <label class="modes" v-for="mode in modes" :key="`mode-${mode}`">
          <input type="radio" v-model="selectedMode" :value="mode" :name="mode">
          {{  capitalize(mode || '') }}
        </label>
      </fieldset>
      <div class="query-box flex flex-row gap-2 m-2 justify-center">
        <fieldset>
          <input class="px-2 py-1" type="text" v-model="inputText" list="poke-query">
          <datalist id="poke-query" v-if="selectedMode ==='name'">
            <option
              class="max-h-24 overflow-scroll"
              v-for="pokemonName in dataItems"
              :key="`poke-option-${pokemonName}`"
              :value="pokemonName"> {{ pokemonName }}
            </option>
          </datalist>
        </fieldset>
        <div class="actions">
          <div class="text-white px-4 py-1 bg-poke-red-0 cursor-pointer"
            @click="() => loadBulbaPage()">
            Query
          </div>
        </div>
      </div>
    </form>
    <div @click="() => showParams = !showParams" class="flex flex-col justify-center cursor-pointer w-24 self-center">
      <div class="m-0">{{ showParams ? 'Hide' : 'Show' }} Params</div>
      <div class="m-0">
        <i class="arrow down h-2 w-2 mt-0"></i>
      </div>
    </div>
    <div v-if="showParams">
      <div>inputText: {{ inputText }}</div>
      <div>mode: {{ selectedMode }}</div>
      <div>urlFromInput: {{ urlFromInput }}</div>
    </div>
    <div class="response">
      <code><pre>{{  }}</pre></code>
    </div>
    <div class="previous-queries">
      <div v-for="pageKey in bulbaPageKeys" :key="`page-${pageKey}`">
        {{ pageKey }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>