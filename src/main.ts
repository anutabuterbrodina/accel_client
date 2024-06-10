import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue'
import router from './router'
import { composableStores } from "@/stores";

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

composableStores.forEach(store => {
    app.provide(store.key, store.value)
})

app.use(router)
app.use(vuetify)

app.mount('#app')
