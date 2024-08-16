/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphqlLoader from 'vite-plugin-graphql-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphqlLoader()],
  test: {
    globals:true,
    environment: 'happy-dom',
    exclude: ['./node_modules']
  },
  optimizeDeps: {
    include: ['vue-router']
  }
})
