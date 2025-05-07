// 引入全局样式文件
import '@/assets/styles/normalize.scss'
// 主题样式
import '@/assets/styles/theme.css'

// 引入bootstrap样式文件
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 引入bootstrap-icons样式文件
import 'bootstrap-icons/font/bootstrap-icons.css'

// 引入element-plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'

import pinia from '@/stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')
