<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()

import BlogEntryPreview from '@/components/BlogEntryPreview.vue'
import BlogPagination from '@/components/BlogPagination.vue'
import UserInfoLogo from '@/components/UserInfoLogo.vue'
import Navbar from './Navbar.vue'

import { useThemeStore, useBlogRoute } from '@/stores'
const themeStore = useThemeStore()
// 同过监听导航来控制是否显示三级路由
const blogRoute = useBlogRoute()

// 监听主题变化，改变背景图
const TopBg = ref(null)
onMounted(() => {
  if (themeStore.theme === 'dark') {
    TopBg.value.style.background = 'url(src/assets/images/b2jpeg) no-repeat center'
  } else {
    TopBg.value.style.background = 'url(src/assets/images/b1.jpeg) no-repeat center'
  }
})

// 监听路由变化
watch(() => route.fullPath, (newPath) => {
  newPath === '/user' ? blogRoute.setFlag(false) : blogRoute.setFlag(true)
})


</script>

<template>
  <div id="user">
    <!-- 顶部 -->
    <div class="top">
      <div class="top-navbar">
        <UserInfoLogo class="user-info" item="回到首页" address="/home"/>
      </div>
      <div ref="TopBg" class="top-bg main"></div>
    </div>
    <!-- 中间导航栏 -->
    <Navbar class="navbar"/>
    <!-- 三级路由出口 -->
    <RouterView class="col-lg-9 main" v-if="blogRoute.flag"/>
    <!-- 博客列表 -->
    <div class="col-lg-9 main masonry-layout" v-else>
      <BlogEntryPreview v-for="i in 10" :key="i"
        title="Vue 3 入门指南"
        author="张三"
        date="2025-04-14"
        excerpt="本指南将带你快速了解 Vue 3 的新特性和基本用法。"
        imageUrl="../../assets/images/07.jpg"
      />
      <!-- 分页功能开始 -->
      <BlogPagination class="col-lg-9"/>
      <!-- 分页功能结束 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
#user {
  background-color: var(--theme-main-bg);
  width: 100%;

  // 版心
  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .top {
    .top-navbar {
      position: relative;
      width: 100%;
      height: 50px;
      background-color: var(--theme-second-bg);

      .user-info {
        position: absolute;
        bottom: 5%;
        right: 5%;
        z-index: 1;
      }
    }

    .top-bg {
      background: url('../../assets/images/b1.jpeg') center no-repeat;
      width: 100%;
      height: 400px;
      background-size: cover;
    }
  }

  .navbar {
    margin-bottom: 50px;
  }

  .col-lg-9 {
    margin: 0 auto;
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