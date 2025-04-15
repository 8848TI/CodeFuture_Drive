<script setup>
import { ref } from 'vue'


// 普通导航项
const normalNavItems = [
  { text: '首页', to: '/', active: true },
  { text: '博客', to: '/blog' },
  { text: '归档', to: '/blog/archives' }
]
// 带下拉菜单的导航项
const dropdownNavItems = [
  {
    title: '前端',
    items: [
      { text: 'HTML', to: '/' },
      { text: "CSS", to: '' },
      { text: "JavaScript", to: '' },
      { text: "NodeJS", to: '' },
      { text: "Vue2 + Vue3", to: '' },
      { divider: true }, // 分割线
      { text: "Canvas", to: '' },
    ],
  },
  {
    title: "后端",
    items: [
      { text: "C语言", to: '' },
      { text: "Java", to: '' },
    ],
  },
  {
    title: "移动端",
    items: [
      { text: "安卓", to: '' },
      { text: "鸿蒙", to: '' },
      { text: "跨平台", to: '' },
    ],
  },
  {
    title: "开发工具",
    items: [
      { text: "git版本管理", to: '' },
      { text: "Typora", to: '' },
      { text: "Everything", to: '' },
    ],
  },
  {
    title: "其它",
    items: [
      { text: "MySQL", to: '' },
      { text: "数据结构与算法", to: '' },
      { text: "FISCO-BOCS", to: '' },
      { text: "摸鱼", to: '' },
    ],
  },
  {
    title: '在线技术文档',
    items: [
      { text: '菜鸟教程', to: '' },
      { text: 'WeBASE手册', to: '' },
    ],
  },
]
</script>

<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          
          <img src="../../assets/logo.svg" alt="" class=".d-inline-block .align-text-top" width="40px">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- 导航栏内容 -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- 遍历普通导航项 -->
            <li v-for="item in normalNavItems" :key="item.text" class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: item.active }"
                :to="item.to"
              >
                {{ item.text }}
              </router-link>
            </li>
        
            <!-- 遍历带下拉菜单的导航项 -->
            <li v-for="dropdown in dropdownNavItems" :key="dropdown.title" class="nav-item dropdown">
              <router-link
                class="nav-link dropdown-toggle"
                :to="dropdown.to || '#'" 
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ dropdown.title }}
              </router-link>
              <ul class="dropdown-menu">
                <li v-for="subItem in dropdown.items" :key="subItem.text">
                  <router-link
                    v-if="subItem.divider !== true"
                    class="dropdown-item"
                    :to="subItem.to"
                  >
                    {{ subItem.text }}
                  </router-link>
                  <hr v-else class="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
          <!-- 搜索表单 -->
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
#navbar {
  margin: 0;
  padding: 0;
}
</style>