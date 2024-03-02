import { createApp } from 'vue'
import { createRouter, createWebHistory  } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/index.vue')
        }
    ]
})

app.use(ElementPlus).use(router).mount('#app')
