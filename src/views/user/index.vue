<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { articleGetUserArticle } from '@/api/articleService'

import BlogEntryPreview from '@/components/BlogEntryPreview.vue'
import BlogPagination from '@/components/BlogPagination.vue'
import Navbar from './Navbar.vue'
import SliderNavbar from './SliderNavbar.vue'

import { useThemeStore, useBlogRoute } from '@/stores'
const themeStore = useThemeStore()
// 同过监听导航来控制是否显示三级路由
const blogRoute = useBlogRoute()

// 监听主题变化，改变背景图
const TopBg = ref(null)
const changeBg = () => {
  if (themeStore.theme === 'dark') {
    TopBg.value.style.background = 'url(src/assets/images/b2.jpeg) no-repeat center'
  } else {
    TopBg.value.style.background = 'url(src/assets/images/b1.jpeg) no-repeat center'
  }
}
onMounted(() => {
  changeBg()
  watch(() => themeStore.theme, changeBg)
})

// 监听路由变化
watch(() => route.fullPath, (newPath) => {
  newPath === '/user' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
})
function setFlag(it) {
  it === '/user' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
}

setFlag(route.fullPath)

// 获取用户的文章
const userArticles = ref([])
const getUserArticles = async () => {
  const res = await articleGetUserArticle()
  if (res.data.status === 0) {
    userArticles.value = res.data.data
    // 将时间戳转换为日期格式 2025-01-01
    for (let i = 0; i < userArticles.value.length; i++) {
      userArticles.value[i].created_at = userArticles.value[i].created_at.split('T')[0]
    }
  }
}
getUserArticles()

// 跳转到文章详情页
const goToArticleDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id } })
}

</script> 

<template>
  <div id="user">
    <!-- 顶部开始 -->
    <div class="top">
      <div ref="TopBg" class="top-bg main">
        <div class="username">{{ userStore.userInfo.username }} 的空间</div>
      </div>
    </div>
    <!-- 顶部结束 -->
    <!-- 中间导航栏开始 -->
    <Navbar class="navbar"/>
    <!-- 中间导航栏结束 -->
    <!-- 三级路由出口 -->
    <RouterView class="col-lg-9 main" v-if="blogRoute.flag"/>
    <!-- 博客列表开始 -->
    <div class="container" v-else>
      <div class="col-lg-9 main masonry-layout">
        <BlogEntryPreview v-for="item in userArticles" :key="item.id"
          :title="item.title"
          author="张三"
          :date="item.created_at"
          :excerpt="item.description"
          imageUrl="../../assets/images/07.jpg"
          @click="goToArticleDetail(item.id)"
        />
        <!-- 分页功能开始 -->
        <BlogPagination class="col-lg-9"/>
        <!-- 分页功能结束 -->
      </div>
      <!-- 右侧固定栏开始 -->
      <SliderNavbar/>
      <!-- 右侧固定栏结束 -->
    </div>
    <!-- 博客列表结束 -->
  </div>
</template>

<style scoped lang="scss">
#user {
  background-color: var(--theme-main-bg);
  width: 100%;

  // 版心
  .main {
    position: relative;
    width: 1000px;
    margin: 0 auto;
  }

  .top {
    .top-bg {
      background: url('../../assets/images/b1.jpeg') center no-repeat;
      width: 100%;
      height: 400px;
      background-size: cover;
      z-index: 0;
      position: relative;

      .username {
        position: absolute;
        left: 22%;
        top: 10%;
        font-size: 35px;
        color: #fff;
        font-weight: 900;
      }
    }
  }

  .navbar {
    margin-bottom: 50px;
  }

  .col-lg-9 {
    margin: 0 auto;
  }

  .container {
    position: relative;
  }

}

@media screen and (max-width: 1000px) {
  #user {
    .main {
      width: 700px;
    }
  }
}

@media screen and (max-width: 700px) {
  #user {
   .main {
      width: 450px;
    }
  }
}
</style>