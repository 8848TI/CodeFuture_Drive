import request from "@/utils/request"

// 用户登录
export const userLogin = ({username, password}) => {
  return request.post('/api/login', { username, password })
}

// 用户注册
export const userRegister = ({username, password}) => {
  return request.post('/api/reguser', { username, password })
}

// 获取用户信息
export const userGetUserInfo = () => {
  return request.get('/my/userinfo')
}

// 更新用户信息
export const userUpdateUserInfo = (data) => {
  return request.post('/my/userinfo', data)
}

// 更新用户头像
export const userUpdateAvatar = (avatar) => {
  return request.post('/my/update/avatar', avatar)
}

// 更新用户密码
export const userUpdatePwd = (data) => {
  return request.post('/my/updatepwd', data)
}

