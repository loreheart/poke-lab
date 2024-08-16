import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router.ts'
import { apollo } from './middleware/apollo.ts'
import './style.css'

import App from './components/AppBody.vue'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(apollo)
  .mount('#app')
