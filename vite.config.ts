/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // isCustomElement: (tag) => {
        //   return tag.startsWith('Router') 
        // }
      }
    }
  })],
  test: {
    globals:true,
    environment: 'happy-dom',
    exclude: ['./node_modules']
  },
  optimizeDeps: {
    include: ['vue-router']
  }
})
