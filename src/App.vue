<script setup>
import { RouterView } from 'vue-router'
import LoadingWrapper from '@/components/LoadingWrapper.vue'

</script>

<template>
  <!-- <router-view v-slot="{ Component }">
    <LoadingWrapper/>
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view> -->
  <div id="app">
    <LoadingWrapper/>
    <RouterView/>
  </div>
</template>

<style lang="scss" scoped>
#app {
  // min-width: 320px;
  position: relative;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}
 
/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {  
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to { 
  opacity: 1;
  transform: translateY(0px);
}
 
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>
