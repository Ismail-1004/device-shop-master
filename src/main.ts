import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus).use(createPinia()).use(router).mount('#app')
