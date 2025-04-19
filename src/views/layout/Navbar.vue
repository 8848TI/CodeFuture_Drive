<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index'
import UserInfoLogo from '@/components/UserInfoLogo.vue'

const router = useRouter()
const userStore = useUserStore()

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

import { useThemeStore } from '@/stores/index'
const theme = useThemeStore()

// 按钮状态
const isDarkTheme = ref(theme.theme === 'light')
// 切换主题的函数
const themeSwitch = () => {
  theme.toggleTheme()
}


</script>

<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="../../assets/logo.jpg" alt="" class=".d-inline-block .align-text-top" width="40px">
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
          <!-- 主题色切换开始 -->
          <label class="theme-switch">
            <input type="checkbox" v-model="isDarkTheme" @click="themeSwitch">
            <span class="slider round">
              <!-- 太阳和月亮 SVG 都放在滑块内 -->
              <svg class="icon sun" v-if="isDarkTheme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#ffd43b">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                </g>
              </svg>
              <svg class="icon moon" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
              </svg>
            </span>
          </label>
          <!-- 主题色切换结束 -->
          <!-- 搜索表单 -->
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <!-- 用户信息logo开始 -->
          <UserInfoLogo item="个人空间" address="/user"/>
          <!-- 用户信息logo结束 -->
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  75% {
    transform: rotate(10deg); 
  }

  100% {
    transform: rotate(0deg); 
  }
}

#navbar {
  margin: 0;
  padding: 0;
  // 导航栏撑满整个屏幕
  width: 100vw;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: .1);
  z-index: 1;

  .navbar {
    background-color: var(--theme-second-bg) !important;
    // 使用 flex 布局，使子元素水平居中
    display: flex;
    justify-content: center;
    .container-fluid {
      // 设置最大宽度，避免内容过宽
      max-width: 1200px; 
      width: 100%;
      // 使用 flex 布局，使子元素水平均匀分布
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .navbar-nav {
      li {
        a {
          color: var(--color-heading);
        }
      }
    }
    // 主题色切换样式开始
    .theme-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
      margin: 0 1rem;
      
      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: all .4s;

      &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: all .4s;
      }

      .icon {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.4s;
      }

      .sun {
        animation: rotate 20s linear infinite;
      }

      .moon {
        animation: tilt 5s linear infinite;
      }
    }

    input:checked + .slider {
      background-color: #eff0f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 2px #ccc;
      background-color: #eff0f3;
    }

    input:not(:checked) + .slider {
      background-color: #272a2f;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    .slider.round {
      border-radius: 34px;
      box-shadow: 0 0 2px #ccc;
    }

    .slider.round:before {
      border-radius: 50%;
    }

    input:checked + .slider .icon {
      left: calc(50% + 4px);
      top: calc(50% - 9px);
    }

    input:not(:checked) + .slider .icon {
      left: calc(50% - 23px);
      top: calc(50% - 10px);
    }
    // 主题色切换样式结束
    
  }
}
</style>