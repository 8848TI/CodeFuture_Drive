import '@/assets/styles/normalize.scss'

// 引入bootstrap样式文件
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'

import pinia from '@/stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
