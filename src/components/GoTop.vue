<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 用于控制按钮的显示与隐藏
const isVisible = ref(false);

// 处理滚动事件
const handleScroll = () => {
  // 当滚动距离超过 300px 时显示按钮
  isVisible.value = window.scrollY > 300;
};

// 点击按钮时滚动到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div id="go-top">
    <button
        v-if="isVisible"
        @click="scrollToTop"
        type="button"
        class="btn btn-primary btn-floating"
        style="position: fixed; bottom: 20px; right: 20px; z-index: 999;"
    >
        <i class="bi bi-arrow-up">a</i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
/* 可以在这里添加额外的自定义样式 */
#go-top {
  /* 可以添加一些样式 */
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  width: 20px;
  height: 20px;
  background-color: #333;
}
</style>