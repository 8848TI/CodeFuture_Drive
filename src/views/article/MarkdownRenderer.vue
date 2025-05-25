<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, ref, nextTick } from 'vue'
import { articleGetArticleById } from '@/api/articlePublicService'
import { useRoute } from 'vue-router'

const route = useRoute()
const contentRef = ref(null)
const vditorInstance = ref(null)

onMounted(async () => {
  try {
    const res = await articleGetArticleById(route.params.id) // 建议从路由参数获取ID
    await nextTick() // 确保DOM已渲染
    
    // 初始化Vditor
    vditorInstance.value = new Vditor(contentRef.value, {
      width: '100%',
      height: '100%',
      value: res.data.data.content,
      preview: {
        markdown: {
          toc: true,
          codeBlockTheme: 'light', // 显式指定代码主题
          hljs: {
            style: 'github' // 或 'vs2015' 等其他主题
          }
        }
      },
      cache: {
    enable: false, // 禁用缓存（如果不需要保存草稿）
    id: `vditor-${route.params.id}` // 使用文章ID作为唯一标识
  },
      counter: {
        enable: false // 禁用计数器
      },
      after: () => {
        // 初始化完成后可在此添加自定义逻辑
      }
    })

    // 手动触发预览模式（如果需要）
    vditorInstance.value.setValue(res.data.data.content)
  } catch (error) {
    console.error('文章加载失败:', error)
    // 添加错误处理逻辑
  }
})
</script>

<template>
  <div class="article">
    <div ref="contentRef" class="vditor-container"></div>
  </div>
</template>

<style lang="scss">
/* 移除 scoped 属性，使用全局样式 */
.vditor-container {
  /* 自定义容器样式 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  /* 代码块样式覆盖 */
  :deep(.vditor-reset) {
    pre {
      background: #f6f8fa !important;
      padding: 1rem !important;
      border-radius: 8px;
      
      code {
        font-family: 'JetBrains Mono', monospace !important;
      }
    }

    /* 表格样式 */
    table {
      display: block;
      width: 100%;
      overflow-x: auto;
      border-collapse: collapse;
      margin: 1rem 0;

      th, td {
        border: 1px solid #e0e0e0;
        padding: 8px 12px;
        min-width: 120px;
      }

      th {
        background: #f5f7fa;
      }
    }
  }
}
</style>