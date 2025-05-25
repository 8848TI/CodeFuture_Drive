<script setup>
import MarkdownIt from 'markdown-it'
import 'github-markdown-css/github-markdown.css'
import hljs from 'highlight.js'
import { onMounted, ref } from 'vue'
import { articleGetArticleById } from '@/api/articlePublicService'
import { useRoute } from 'vue-router'
const route = useRoute() // 获取路由对象
import 'highlight.js/styles/github.css' // 选择主题样式
import { nextTick } from 'vue'

import ArticleComments from '@/components/ArticleComments.vue'



const content = ref(null) // 定义一个 ref 来存储文章内容的 DOM 元素，用于插入 Markdow
const articleContent = ref('') // 定义一个 ref 来存储文章内容
onMounted(async () => {
  const res = await articleGetArticleById(route.params.id)
  articleContent.value = res.data.data.content
  // 将Markdown转换为HTML 这边采用markdown-it
  const md = new MarkdownIt({
    html: true, // 允许HTML标签
    linkify: true, // 自动将URL转换为链接
    typographer: true, // 启用一些语言中立的替换 + 引号美化
    breaks: true, // 转换 '\n' 到 <br>
  })
  content.value = md.render(articleContent.value)
  
  // 下一帧执行代码高亮
  nextTick(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
    document.querySelectorAll('pre').forEach((block) => {
      // 添加背景颜色
      block.style.backgroundColor = 'var(--code-bg)'
    })
    document.querySelectorAll('table tr:nth-child(2n - 1)').forEach((block) => {
      // 添加背景颜色
      block.style.backgroundColor = 'var(--table-odd-bg)'
    })
    document.querySelectorAll('table tr:nth-child(2n)').forEach((block) => {
      // 添加背景颜色
      block.style.backgroundColor = 'var(--table-even-bg)'
    })
    document.querySelectorAll('strong').forEach((block) => {
      // 添加背景颜色
      block.style.color = 'var(--color-text)'
    })
  })
})
</script>

<template>
  <div class="article markdown-body">
    <div v-html="content" class="article-content"></div>
    <!-- 评论功能 -->
    <ArticleComments />
  </div>
</template>

<style lang="scss" scoped>
.article {
  .article-content {
    width: 1000px;
    margin: 0 auto;
  }
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 45px;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";

}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

@media (prefers-color-scheme) {
}
</style>
