import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from './module/blogRoute'
export * from './module/theme'
export * from './module/user'
export * from './module/common'