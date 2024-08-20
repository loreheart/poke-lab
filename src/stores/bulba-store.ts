import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useLocalStorageStore } from './local-storage-store'
import { getBulbaPageUrl } from '../helpers'

export const useBulbaStore = defineStore('bulba-store', () => {

  const savedPageKeys: Ref<string[]> = ref([])
  const selectedPage = ref()
  
  // LocalStorage key pattern
  // 'bulba-pages'
  // 'bulba-page-'
  const localStorageStore = useLocalStorageStore()
  const hasLocalStorage = localStorageStore.ready
  savedPageKeys.value = localStorageStore.loadItem('bulba-pages') || []

  const loadBulbaPage = (pageName: string) => {
    const existsInLocal = savedPageKeys.value.includes(pageName)
    console.log(existsInLocal, pageName)
    if (hasLocalStorage && existsInLocal) {
      selectedPage.value = localStorageStore.loadItem(`bulba-pages-${pageName}`)
      console.log('Checking localStorage for item: ', selectedPage.value)
    } else if (hasLocalStorage) {
      try {
        console.log('querying bulbapedia for page data')
        axios.get(getBulbaPageUrl(pageName)).then((response) => {
          console.log('Response: ', response)
          // save to local
          // localStorageStore.setItem('bulba-page-' + pageName, )
        })
      } catch(e) {
        console.warn('Error querying bulbapedia', e)
      }
    }
  }

  return {
    selectedPage,
    savedPageKeys,
    loadBulbaPage,
  }
})
