import request from "@/utils/request"

// 获取所有公用文章
export const articleGetAllArticle = () => {
  return request.get('/public/articlelist')
}

// 获取用户文章
export const articleGetUserArticle = () => {
  return request.get('/article/list')
}

// 添加文章
export const articleAddArticle = (data) => {
  return request.post('/article/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}