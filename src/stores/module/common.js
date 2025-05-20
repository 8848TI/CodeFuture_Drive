import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCommonStore = defineStore('common', () => {
    const isLoading = ref(false) // 全局加载状态
    const setLoading = (val) => { isLoading.value = val } // 设置全局加载状态
    const getLoading = computed(() => isLoading.value) // 获取全局加载状态

    return { isLoading, setLoading, getLoading }
}, {
    persist: true, // 开启持久化存储
})