import request from "@/utils/request"

// 获取所有文章
export const adminGetArticleCount = () => {
  return request.get('/admin/articles/stats/total')
}

// 获取文章分类分布
export const adminGetArticleCategoryCount = () => {
  return request.get('/admin/articles/stats/category-distribution')
}

// 自定义日期统计
export const adminGetArticleCustomDateCount = (startDate, endDate) => {
  return request.get('/admin/articles/stats/custom-date', { params: { startDate, endDate } })
}

// 获取所有用户
export const adminGetUserCount = () => {
  return request.get('/admin/users/stats/total')
}
