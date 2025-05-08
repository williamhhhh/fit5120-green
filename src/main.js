import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let app = null

const auth = getAuth()
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(PrimeVue, { theme: { preset: Aura } })
    app.use(router)
    app.mount('#app')
  }
})