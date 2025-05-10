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

  // 定义角色状态
  const role = ref('')
  const setRole = (newRole) => {
    role.value = newRole
  }
  const removeRole = () => {
    role.value = ''
  }

  // 定义登录状态和用户信息
  const isLoggedIn = ref(false)
  const userInfo = ref({})
  const getUserInfo = async () => {
    const res = await userGetUserInfo()
    userInfo.value = res.data.data
  }
  const setUserInfo = (newUserInfo) => {
    userInfo.value = newUserInfo
  }

  // 定义登录和退出登录方法
  const login = async () => {
    getUserInfo()
    isLoggedIn.value = true
  }
  const logout = () => {
    isLoggedIn.value = false
    removeToken()
    removeRole()
    userInfo.value = {} 
  }

  return { token, setToken, removeToken, isLoggedIn, userInfo, login, logout, userInfo, getUserInfo, setUserInfo, role, setRole, removeRole }
}, {
  persist: true, // 开启持久化存储
})
