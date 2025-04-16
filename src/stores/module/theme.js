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
  return {
    theme,
    toggleTheme
  }
})