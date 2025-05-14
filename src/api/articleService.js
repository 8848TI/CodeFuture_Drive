import request from "@/utils/request"

// 获取所有公用文章
export const articleGetAllArticle = () => {
  return request.get('/public/articlelist')
}