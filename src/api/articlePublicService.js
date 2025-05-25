import request from "@/utils/request"


// 获取所有公用文章
export const articleGetPublicAllArticle = (currentPage, pageSize) => {
    return request.get('/public/articlelist', { params: { currentPage, pageSize }})
}

// 获取所有公有文章的标签
export const articleGetPublicAllArticleTags = () => {
    return request.get('/public/typelist')
}

// 根据id获取文章
export const articleGetArticleById = (id) => {
    return request.get(`/public/article/${id}`)
}

// 根据标签名获取所有公有的的文章
export const articleGetArticleByTagName = (tagName) => {
    return request.get(`/public/articlebytype/${tagName}`)
}