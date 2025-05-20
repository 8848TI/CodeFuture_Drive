import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const KEY = '__theme__'
  const theme = ref(localStorage.getItem(KEY) || 'light')
  const toggleTheme = () => {
    if (theme.value === 'light') {
      theme.value = 'dark'
    } else {
      theme.value = 'light'
    }
  }
  // 监听theme的变化，当theme变化时，将自定义属性修改为theme的值
  watchEffect(() => {
    document.documentElement.dataset.theme = theme.value
    localStorage.setItem(KEY, theme.value)
  })
  // 背景图地址
  const bgUrl = ref('src/assets/images/b1.jpeg')
  const setBgUrl = (e) => {
    bgUrl.value = e
  }
  const getBgUrl = () => {
    return bgUrl.value
  }
  return {
    theme,
    toggleTheme,
    bgUrl,
    setBgUrl,
    getBgUrl
  }
})