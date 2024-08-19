import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLocalStorageStore = defineStore('local-storage', () => {
  const ready = ref()

  const loadItem = (key: string) => {
    const item = localStorage.getItem(key)
    if(ready.value && item) {
      return JSON.parse(item)
    }
  }

  const setItem = <T,>(key: string, item: T) => {
    if(ready.value) {
      const newItemString = JSON.stringify(item)
      localStorage.setItem(key, newItemString)
    }
  }

  const resetItem = (key: string) => {
    localStorage.removeItem(key)
  }

  const checkIsLocalStorageAvailable = () => {
    const test = 'test'
    try {
      setItem(test, test)
      loadItem(test)
      resetItem(test)
      return true
    } catch(e) {
      console.warn('Local Storage Unavailable, Error: ', e)
      return false
    }
  }
  ready.value = checkIsLocalStorageAvailable()

  return {
    ready,
    setItem,
    loadItem,
    resetItem,
  }
})