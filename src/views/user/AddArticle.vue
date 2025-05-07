<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 初始化 Vditor 编辑器
const vditor = ref()
// 控制弹框和遮罩层的显示
const showDialog = ref(false)
const router = useRouter()

// 在组件挂载后初始化编辑器
onMounted(() => {
  vditor.value = new Vditor('vditor',{
    height: '95vh',
    width: '100vw',
    // 添加主题
    theme: {
      current: 'dark' // 或者 'light'
    },
    // 内容主题
    contentTheme: {
      current: 'dark' // 或者 'light'
    }
  })
})

// 点击返回上一页按钮，显示弹框
const goBack = () => {
  showDialog.value = true
}

// 确认离开
const confirmLeave = () => {
  router.back()
  showDialog.value = false
}

// 取消离开
const cancelLeave = () => {
  showDialog.value = false
}

// 定时发布按钮点击事件
const schedulePublish = () => {
  console.log('定时发布')
}

// 发布博客按钮点击事件
const publishBlog = () => {
  console.log('发布博客')
}

</script>

<template>
  <div id="add-article">
    <div id="vditor"></div>
    <!-- 底部使用 Bootstrap 实现固定定位和响应式布局 -->
    <div class="fixed-bottom bg-white py-2 border-top">
      <div class="container d-flex justify-content-between">
        <div class="container d-flex justify-content-start">
          <button 
            type="button" 
            class="btn btn-secondary me-2" 
            @click="goBack"
          >
            返回上一页
          </button>
        </div>
        <div class="container d-flex justify-content-end">
          <button 
            type="button" 
            class="btn btn-secondary me-2" 
            @click="schedulePublish"
          >
            定时发布
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="publishBlog"
          >
            发布博客
          </button>
        </div>
      </div>
    </div>
    <!-- 使用 transition 组件添加遮罩层动画 -->
    <transition name="fade">
      <div v-if="showDialog" class="overlay" @click="cancelLeave"></div>
    </transition>
    <!-- 使用 transition 组件添加弹框动画 -->
    <transition name="dialog">
      <div v-if="showDialog" class="dialog">
        <p>确认离开当前页面吗？</p>
        <button @click="confirmLeave">确认</button>
        <button @click="cancelLeave">取消</button>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
#add-article {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: #fff;
  z-index: 1001;
  border-radius: 4px;
  text-align: center;
}

.dialog button {
  margin: 0 10px;
  padding: 5px 15px;
}

/* 遮罩层淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 弹框缩放动画 */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>