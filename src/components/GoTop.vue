<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Top } from '@element-plus/icons-vue'

// 图标大小
const size = ref(25) 
// 控制是否显示回到顶部按钮
const isVisible = ref(true) 

// 定义回到顶部的方法
const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
}

// 处理滚动事件，判断是否显示按钮
const handleScroll = () => {
  isVisible.value = window.pageYOffset > 200 // 当滚动距离超过 200px 时显示
}

// 组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div v-if="isVisible" id="go-top" @click="goToTop">
    <el-icon :size="size" color="var(--icon-color)"><Top /></el-icon>
  </div>
</template>

<style lang="scss" scoped>
#go-top {
  position: fixed;
  right: 5%;
  bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 2px solid var(--icon-color);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

#go-top:hover {
  opacity: 0.8;
}
</style>