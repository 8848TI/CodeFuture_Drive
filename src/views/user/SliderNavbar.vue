<script setup>
import { shallowRef, onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Top } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const size = shallowRef(25)
const themeIcon = shallowRef(Sunny)

const theme = useThemeStore()

// 定义切换主题的方法
const themeSwitch = () => {
  theme.toggleTheme()
  // 修改图标
  if (theme.theme === 'dark') {
    themeIcon.value = Moon
  } else {
    themeIcon.value = Sunny
  }
}

// 在组件挂载时，根据当前主题初始化图标
onMounted(() => {
  if (theme.theme === 'dark') {
    themeIcon.value = Moon
  } else {
    themeIcon.value = Sunny
  }
})


const goTopSize = ref(25); // 图标大小
// 定义回到顶部的方法
const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
}

// 添加文章
const addArticle = () => {
  // route.push('/addarticle')
  window.location.href = '/addarticle'
}

// 回到首页
const goHome = () => {
  window.location.href = '/home'
}

// 退出登录
const leave = () => {
  // localStorage.removeItem('token')
  route.push('/login')
}
</script>

<template>
  <div id="slider-navbar">
    <ul>
      <li @click="addArticle"><el-icon :size="size" color="var(--icon-color)"><CirclePlus /></el-icon></li> 
      <li @click="goHome"><el-icon :size="size" color="var(--icon-color)"><HomeFilled /></el-icon></li> 
      <li @click="leave"><i class="bi bi-door-open" style="color: var(--icon-color);"></i></li> 
      <!-- 动态绑定图标组件 -->
      <li @click="themeSwitch"><el-icon :size="size" color="var(--icon-color)"><component :is="themeIcon" /></el-icon></li> 
      <li id="go-top" @click="goToTop">
        <el-icon :size="goTopSize" color="var(--icon-color)"><Top /></el-icon>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#slider-navbar {
    position: fixed;
    right: 5%;
    bottom: 10%;

    ul {
      li {
        width: 50px;
        height: 50px;
        background-color: var(--theme-second-bg);
        border-radius: 50%;
        margin: 10px;
        // 使用 flexbox 布局实现居中
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 50px;
      }
    }
}

/* 合并 GoTop.vue 的样式部分 */
#go-top {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>