import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 定义用户状态
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  // 定义登录状态和用户信息
  const isLoggedIn = ref(false)
  const userInfo = ref({
    username: '30229',
    nickname: 'Jack',
    email: '30229@qq.com',
    id: '2'
  })
  const getUserInfo = () => {
    return userInfo.value
  }
  const login = (user) => {
    isLoggedIn.value = true
    userInfo.value = user
  }
  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = {} 
  }

  return { token, setToken, removeToken, isLoggedIn, userInfo, login, logout, userInfo, getUserInfo }
}, {
  persist: true, // 开启持久化存储
})
