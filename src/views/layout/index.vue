<script setup>
import { RouterView } from 'vue-router'
import Navbar from './Navbar.vue'
import FooterInfo from './FooterInfo.vue'


</script>

<template>
  <div id="layout">
    <!-- 导航栏 -->
    <Navbar></Navbar>

    <!-- 二级路由出口 -->
    <RouterView/>

    <!-- 页脚 -->
    <FooterInfo></FooterInfo>

  </div>
</template>

<style scoped lang="scss">
#layout {
  
}
</style>