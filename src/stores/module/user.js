import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetUserInfo } from '@/api/userService'

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
  const userInfo = ref({})
  const getUserInfo = async () => {
    const res = await userGetUserInfo()
    userInfo.value = res.data
    isLoggedIn.value = true
  }
  const setUserInfo = (newUserInfo) => {
    userInfo.value = newUserInfo
  }

  // 定义登录和退出登录方法
  const login = (user) => {
    isLoggedIn.value = true
    userInfo.value = user
  }
  const logout = () => {
    isLoggedIn.value = false
    removeToken()
    userInfo.value = {} 
  }

  return { token, setToken, removeToken, isLoggedIn, userInfo, login, logout, userInfo, getUserInfo, setUserInfo }
}, {
  persist: true, // 开启持久化存储
})
