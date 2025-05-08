import request from "@/utils/request"

// 用户登录
export const userLogin = ({username, password}) => {
  return request.post('/api/login', { username, password })
}

// 用户注册
export const userRegister = (username, password) => {
  return request.post('/api/register', { username, password })
}

// 获取用户信息
export const userGetUserInfo = () => {
  return request.get('/my/userinfo')
}