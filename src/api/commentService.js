import request from "@/utils/request"

// 用户添加评论
export const commentAddComment = (article_id, content) => {
    return request.post('/comment/addcomment', { article_id, content })
}