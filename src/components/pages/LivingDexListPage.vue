<script setup lang="ts">
  import { DexData, DexOption, Pokedex, Pokemon } from '../../types';
  import { useLocalStorageStore, usePokedexStore } from '../../stores';
  import PokedexTile from '../../components/PokedexTile.vue'
  import { ref } from 'vue';


  const dexOptions: DexOption[] = [
    {
      id: 0,
      name: 'National',
      dexnum: [1]
    },
    {
      id: 1,
      name: 'Kanto',
      dexnum: [2]
    },
    {
      id: 2,
      name: 'Johto',
      dexnum: [3]
    },
    {
      id: 3,
      name: 'Hoenn',
      dexnum: [4]
    },
    {
      id: 4,
      name: 'Sinnoh',
      dexnum: [6]
    },
    {
      id: 5,
      name: 'Unova',
      dexnum: [9]
    },
    {
      id: 6,
      name: 'Kalos',
      dexnum: [12, 13, 14]
    },
    {
      id: 7,
      name: 'Alola',
      dexnum: [21]
    },
    {
      id: 8,
      name: 'Galar',
      dexnum: [27, 28, 29]
    },
    {
      id: 9,
      name: 'Paldea',
      dexnum: [31, 32, 33]
    },

  ]

  const pokedexStore = usePokedexStore()
  const pokedex: Pokemon[] = pokedexStore.loadPokedex()
  const localStorageStore = useLocalStorageStore()
  const hasLocalStorage = localStorageStore.ready

  let initialList = []

  if(hasLocalStorage) {
    const localPokedex = JSON.parse(localStorageStore.loadItem('pokedex-list')) || []
    initialList = localPokedex
  }

  const pokedexList = ref(initialList)
  const showDexOptions = ref(false)
  const showRemoveDex = ref(false)
  const showData = ref(false)
  const selectedDex = ref<Pokedex | null>(null)

  console.log(pokedexList.value)

  const loadPokedexList = async (dexnum: number) => {
    const existingDex = localStorageStore.loadItem(`pokedex-${dexnum}`)

    if(existingDex) {
      return JSON.parse(existingDex)
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${dexnum}/`)
    const data = await response.json()

    localStorageStore.setItem(`pokedex-${dexnum}`, JSON.stringify(data))
    return data
  }

  const updateDexList = () => {
    localStorageStore.setItem('pokedex-list', JSON.stringify(pokedexList.value))
  }

  const addDex = async (dexOption: DexOption) => {
    const dexes = await Promise.all(dexOption.dexnum.map(async (dexnum) => {
      return await loadPokedexList(dexnum)
    }))

    const newDex: Pokedex = {...dexOption, dexData: dexes, progress: []}
    pokedexList.value = [...pokedexList.value, newDex]
    updateDexList()
    showDexOptions.value = false
  }

  const removeDex = (dexIndex: string | number) => {
    pokedexList.value.splice(dexIndex, 1)
    updateDexList()
    showRemoveDex.value = false
  }

  const selectLivingDex = (livingDex: Pokedex) => {
    selectedDex.value = livingDex
    const loadedData = loadPokemonDetails()
    console.log(loadedData)
  }

  const loadPokemonDetails = () => {
    if (selectedDex.value) {
      selectedDex.value.dexData.forEach(dexData => {
        dexData.pokemon_entries = dexData.pokemon_entries.map(pokemon => {
          const id = +pokemon.pokemon_species.url.split('/')[6]
          const types = pokedex[+id - 1].types
          return {
            ...pokemon,
            id,
            name: pokemon.pokemon_species.name,
            types,
          }
        })
      })
    }
  }

  const hasPokemon = (dexId: number, nationalId: number): boolean => {
    return !!selectedDex.value?.progress.includes(`${dexId}-${nationalId}`)
  }

  const formatForExport = () => {
    const exportedData = pokedexList.value.map(({name, progress}: Pokedex) => {
      return {
        name,
        progress
      }
    })
    return JSON.stringify(exportedData)
  }

  const togglePokemonCaught = (dexId: number, nationalId: number) => {
    if(selectedDex.value) {
      const key = `${dexId}-${nationalId}`
      const hasKey = selectedDex.value.progress.includes(key)

      if(!hasKey) {
        selectedDex.value.progress.push(key)
      } else {
        const keyIndex = selectedDex.value.progress.indexOf(key)
        selectedDex.value.progress.splice(keyIndex, 1)
      }
      const dexFromList = pokedexList.value.find((pokedex: Pokedex) => pokedex.name === selectedDex.value!.name)
      dexFromList.progress = selectedDex.value.progress
      updateDexList()
    }
  }

</script>

<template>
  <div>
    <h1>Living Dex Tracker {{ selectedDex?.name || '' }}</h1>

    <section class="dex-list" v-if="!selectedDex">
      <div class="m-2">
        <div class="my-4 mx-auto p-2 border-4 border-red-800 max-w-screen-md flex justify-between"
          v-for="livingDex, index of pokedexList"
          :key="livingDex.name">
          <h2 class="cursor-pointer" v-on:click="selectLivingDex(livingDex)">{{ livingDex.name }}</h2>
          <div>
            Progress: {{ livingDex.progress.length }} /
            {{ livingDex.dexData.reduce((dexCount: number, dexItem: DexData) => dexCount + dexItem.pokemon_entries.length, 0)}}
            ({{ Math.round(100 * livingDex.progress.length / livingDex.dexData.reduce((dexCount: number, dexItem: DexData) => dexCount + dexItem.pokemon_entries.length, 0)) }}%)
          </div>
          
          <button v-if="showRemoveDex" v-on:click="removeDex(index)">Remove</button>
        </div>
      </div>

      <div class="controls">
        <button class="m-2 p-2 border-4 border-green-800"
          v-on:click="showDexOptions  = !showDexOptions">
          {{ showDexOptions ? 'Exit Add' : 'Add Dex' }}
        </button>
        <button class="m-2 p-2 border-4 border-red-800"
          v-on:click="showRemoveDex = !showRemoveDex">
          {{ showRemoveDex ? 'Exit Remove' : 'Remove Dex' }}
        </button>
          <button class="m-2 p-2 border-4 border-blue-800"
          v-on:click="showData = !showData">
          {{ showData ? 'Hide Data' : 'Show Data' }}
        </button>
      </div>


      <div class="flex justify-center" v-if="showDexOptions">
        <div v-for="dexOption in dexOptions" :key="dexOption.name">
          <button
            class="m-2 p-2 border-4 border-red-800"
            v-on:click="addDex(dexOption)"
          >{{ dexOption.name }}</button>
        </div>
      </div>
      <div v-if="showData">
        <pre class="max-h-80 overflow-y-scroll">
          <code>
            {{ formatForExport() }}
          </code>
        </pre>
      </div>

    </section>

    <section class="dex-detail flex flex-col" v-if="!!selectedDex">
      <button class="my-4 mx-auto p-2 border-4 border-red-800" v-on:click="selectedDex = null">Back to List</button>
      <h2>{{selectedDex.name}} Dex Detail</h2>
      <div class="flex flex-wrap justify-center" v-for="pokedex in selectedDex.dexData" :key="pokedex.id">
        <div :class="`size-48 ${hasPokemon(pokedex.id, pokemon.id!) ? '' : 'opacity-50'}`" v-for="pokemon in pokedex.pokemon_entries" :key="pokemon.id">
          <PokedexTile class="cursor-pointer" :pokemon="{
            id: pokemon.id!,
            name: pokemon.pokemon_species.name!,
            types: pokemon.types!,
          }"
          @selectPokemon="() => togglePokemonCaught(pokedex.id, pokemon.id!)" 
          />
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

</style>
