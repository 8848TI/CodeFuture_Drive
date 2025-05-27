<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref, onMounted, watch } from 'vue'
import { articleGetArticleByTagName } from '@/api/articlePublicService'

const title = ref('')
onMounted(() => {
  // 首字母大写
  title.value = route.params.tagName.charAt(0).toUpperCase() + route.params.tagName.slice(1)
})

// 拿到路由参数
const articleList = ref([])
onMounted(async () => {
    const res = await articleGetArticleByTagName(route.params.tagName)
    console.log(route.params.tagName)
    articleList.value = res.data.data
    for (let i = 0; i < articleList.value.length; i++) {
      articleList.value[i].created_at = articleList.value[i].created_at.split('T')[0]
    }
})

// 监听路由参数变化
watch(() => route.params.tagName, async (newVal) => {
    const res = await articleGetArticleByTagName(newVal)
    console.log(route.params.tagName)
    articleList.value = res.data.data
    title.value = route.params.tagName.charAt(0).toUpperCase() + route.params.tagName.slice(1)
    for (let i = 0; i < articleList.value.length; i++) {
      articleList.value[i].created_at = articleList.value[i].created_at.split('T')[0]
    }
})

</script>

<template>
    <div id="categoriesList">
        <page-container class="page-container" :title="title">
            <div v-for="article in articleList" :key="article.id" class="article-item">
                <span class="article-title">{{ article.title }}</span>
                <span class="article-date">{{ article.created_at }}</span>
            </div>
        </page-container>
    </div>
</template>

<style lang="scss" scoped>
.page-container {
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.article-title {
  font-size: 16px;
  color: var(--color-heading);
  font-weight: bold;
}

.article-date {
  font-size: 14px;
  color: #999;
}
</style>