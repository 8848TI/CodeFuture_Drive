import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBlogRoute = defineStore('blogRoute', () => {
  const flag = ref(false)
  const setFlag = (val) => { flag.value = val }
  const getFlag = computed(() => flag.value)

  return { flag, setFlag, getFlag }
},{
  persist: true, // 开启持久化
})
