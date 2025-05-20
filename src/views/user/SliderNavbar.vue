<script setup>
import { shallowRef, onMounted, ref, watch } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Top } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUserStore, useThemeStore } from '@/stores'
const userStore = useUserStore()

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

// 监听主题变化，改变背景图
const changeBg = () => {
  if (theme.theme === 'dark') {
    theme.setBgUrl('src/assets/images/b2.jpeg')
  } else {
    theme.setBgUrl('src/assets/images/b1.jpeg')
  }
}
onMounted(() => {
  watch(() => theme.theme, changeBg)
})

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
  router.push('/addarticle')
}

// 回到首页
const goHome = () => {
  router.push('/home')
}

// 退出登录
const leave = () => {
  userStore.logout()
  router.push('/login')
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
        box-shadow: 1px 1px 2px var(--theme-card-highlight);
        transition: all .5s ease;

      }

      li:hover {
        cursor: pointer;
        background-color: var(--theme-card-highlight);
        transform: scale(1.1);
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