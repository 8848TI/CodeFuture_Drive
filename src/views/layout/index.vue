<script setup>
import { RouterView } from 'vue-router'
import Navbar from './Navbar.vue'
</script>

<template>
  <div id="layout" class="d-flex flex-column vh-100">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 二级路由出口 -->
    <div class="flex-grow-1 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
#layout {
  /* 确保布局不会有额外的滚动条 */
  overflow: hidden;
  background: var(--theme-gradient);
}
</style>