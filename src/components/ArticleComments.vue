<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute() // 获取路由对象
import { articleGetCommentByArticleId } from '@/api/articlePublicService'
import { commentAddComment } from '@/api/commentService'
import { ElMessage } from 'element-plus' // 导入 ElementPlus 组件库
import TimeUtils from '@/utils/timeUtils' // 导入时间工具类


// 发送评论
const sendComment = async () => {
  const content = tx.value.value.trim() // 获取评论内容并去除空格
  if (!content) {
    ElMessage({
      message: '评论内容不能为空', // 提示信息内容
      type: 'warning', // 提示信息类型，这里是警告类型
    })
    return
  }
  const res = await commentAddComment(route.params.id, content) // 调用接口发送评论
  if (res.data.status === 0) {
    ElMessage({
      message: '评论发送成功，请等待审核', // 提示信息内容
      type: 'success', // 提示信息类型，这里是成功类型
    })
    // 清空评论框
    tx.value.value = ''
  } else {
    ElMessage({
      message: '评论发送失败', // 提示信息内容
      type: 'error', // 提示信息类型，这里是错误类型
    })
  }
}
// 键盘事件处理
const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { // 检测是否按下了 Enter 键且没有按下 Shift 键
    e.preventDefault() // 阻止默认行为（换行）
    sendComment() // 发送评论
  }
}


// 评论列表
const comments = ref([]) // 评论列表
const page = ref(1) // 当前页码
const pageSize = ref(10) // 每页显示的评论数
onMounted(async () => {
  const res = await articleGetCommentByArticleId(route.params.id, page.value, pageSize.value)
  comments.value = res.data.data
  comments.value.forEach(item => {
    item.created_at = TimeUtils.format(item.created_at, 'YYYY-MM-DD HH:mm') // 格式化时间戳
  })
  // 监听滚动事件，加载更多评论
  window.addEventListener('scroll', handleScroll)
})
// 滚动事件处理
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取滚动条位置
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 获取文档高度
  const clientHeight = document.documentElement.clientHeight || window.innerHeight // 获取可视区域高度

  console.log('scrollTop:', scrollTop) // 打印滚动条位置
  console.log('scrollHeight:', scrollHeight) // 打印文档高度
  console.log('clientHeight:', clientHeight) // 打印可视区域高度
}

const tx = ref(null) // 评论框
const total = ref(0) // 字数
const totalSpan = ref(null) // 字数统计元素引用
const isTotalVisible = ref(false) // 控制显示状态
 
// 聚焦事件处理
const handleFocus = () => {
  isTotalVisible.value = true
}
 
// 输入事件处理
const handleInput = (e) => {
  const value = e.target.value
  total.value = value.length
  
  // 字数限制逻辑（可选）
  if (value.length > 200) {
    e.target.value = value.slice(0, 200)
    total.value = 200
  }
}
 
onMounted(() => {
  tx.value.addEventListener('focus', handleFocus)
  tx.value.addEventListener('input', handleInput)
})
 
onBeforeUnmount(() => {
  tx.value?.removeEventListener('focus', handleFocus)
  tx.value?.removeEventListener('input', handleInput)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="article-comments">
    <div class="wrapper">
      <i class="avatar">
        <img src="../assets/images/avatar.png" alt="头像" />
      </i>
      <textarea ref="tx" @keydown.enter="handleKeydown" placeholder="发一条友善的评论" rows="2" maxlength="200"></textarea>
      <button @click="sendComment">发布</button>
    </div>
    <div class="wrapper">
      <span class="total" ref="totalSpan" v-show="isTotalVisible">
        {{ total }}/200字
      </span>
    </div>
    <div class="list">
      <div class="item" v-for="item in comments" :key="item.comment_id">
        <i class="avatar">
          <img src="../assets/images/avatar.png" alt="头像" />
        </i>
        <div class="info">
          <p class="name">{{ item.nickname }}</p>
          <p class="text">{{ item.content }}</p>
          <p class="time">{{ item.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-comments {
  margin-top: 30px;

  .wrapper {
    min-width: 400px;
    max-width: 800px;
    display: flex;
    justify-content: end;
    margin: 0 auto;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    textarea {
      outline: none;
      border-color: transparent;
      resize: none;
      background: #f5f5f5;
      border-radius: 4px;
      flex: 1;
      padding: 10px;
      transition: all 0.5s;
      height: 50px;
    }

    textarea:focus {
      border-color: #e4e4e4;
      background: #fff;
      height: 60px;
    }

    button {
      background: #00aeec;
      color: #fff;
      border: none;
      border-radius: 4px;
      margin-left: 10px;
      width: 70px;
      cursor: pointer;
    }

    .total {
      margin-right: 80px;
      color: #999;
      margin-top: 5px;
      transition: all 0.5s;
    }
  }

  .list {
    min-width: 400px;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    margin: 50px auto;

    .item {
      width: 100%;
      display: flex;
      margin: 10px 0;
      
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

      .info {
        flex: 1;
        border-bottom: 1px dashed #e4e4e4;
        padding-bottom: 10px;

        p {
          margin: 0;
        }

        .name {
          color: #FB7299;
          font-size: 14px;
          font-weight: bold;
        }

        .text {
          color: #333;
          padding: 10px 0;
        }

        .time {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .article-comments {
    .wrapper {
      min-width: 200px;
      max-width: 400px;
    }
  }
}
</style>