<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
import { articleGetArticleById } from '@/api/articlePublicService'
import { useRoute } from 'vue-router'
const route = useRoute()

// 假设这是从后端获取的 Markdown 内容
const markdownContent = ref('')
const htmlContent = ref('')

onMounted(async () => {
  // 从后端获取 Markdown 内容
  const res = await articleGetArticleById(route.params.id)
  markdownContent.value = res.data.data.content

  // 使用 Vditor 的解析方法将 Markdown 转换为 HTML
  htmlContent.value = await Vditor.md2html(markdownContent.value, {
    theme: 'light',
    // 可以根据需要添加更多配置项
    
  })
})
</script>

<template>
  <div id="article">
    <!-- 渲染转换后的 HTML 内容 -->
    <div class="main" v-html="htmlContent"></div>
  </div>
</template>

<style scoped lang="scss">
#article {
  // 版心
  .main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
}
</style>