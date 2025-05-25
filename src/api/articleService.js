import request from "@/utils/request"

// 获取用户文章
export const articleGetUserArticle = (page, pageSize) => {
  return request.get('/article/list', { params: { page, pageSize } })

}

// 添加文章
export const articleAddArticle = (data) => {
  return request.post('/article/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



