import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

// css
import '@/assets/styles/index.css'

createApp(App)
  .use(router)
  .mount('#app')
