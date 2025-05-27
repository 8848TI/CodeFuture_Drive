import request from "@/utils/request"


// 获取所有公用文章
export const articleGetPublicAllArticle = (page, pageSize) => {
    return request.get('/public/articlelist', { params: { page, pageSize }})
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

// 获取当前文章下的所有评论
export const articleGetCommentByArticleId = (articleId, currentPage, pageSize) => {
    return request.get(`/public/commentlist/${articleId}`, { params: { currentPage, pageSize }})
}



