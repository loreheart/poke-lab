import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router.ts'
import './style.css'
import App from './components/AppBody.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
