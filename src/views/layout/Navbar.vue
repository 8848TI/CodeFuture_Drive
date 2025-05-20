<script setup>
import { ref, computed } from 'vue'
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
      { text: 'HTML', to: '/blog/HTML' },
      { text: "CSS", to: '/blog/CSS' },
      { text: "JavaScript", to: '/blog/javascript' },
      { text: "NodeJS", to: '/blog/nodejs' },
      { text: "Vue2 + Vue3", to: '/blog/vue' },
      { divider: true }, // 分割线
      { text: "Canvas", to: '/blog/canvas' },
    ],
  },
  {
    title: "后端",
    items: [
      { text: "C语言", to: '/blog/c' },
      { text: "Java", to: '/blog/java' },
    ],
  },
  {
    title: "移动端",
    items: [
      { text: "安卓", to: '/blog/android' },
      { text: "鸿蒙", to: '/blog/harmonyos' },
      { text: "跨平台", to: '/blog/uniapp' },
    ],
  },
  {
    title: "开发工具",
    items: [
      { text: "git版本管理", to: '/blog/git' },
      { text: "Everything", to: '/blog/everything' },
    ],
  },
  {
    title: "其它",
    items: [
      { text: "MySQL", to: '/blog/mysql' },
      { text: "数据结构与算法", to: '/blog/' },
      { text: "区块链", to: '/blog/blockchain' },
      { text: "摸鱼", to: '/blog/slackoff' },
    ],
  },
  {
    title: '在线技术文档',
    items: [
      { text: '菜鸟教程', to: 'https://www.runoob.com/' },
      { text: 'WeBASE手册', to: 'https://webasedoc.readthedocs.io/' },
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

const userInfoLogo = [
  { text: '个人空间', to: '/user' },
  { text: '管理博客', to: '/admin' },
  { text: '我的文章', to: '/user' }
]

// 模拟搜索数据
const mockData = [
  { id: 1, title: 'Vue 3 入门教程' },
  { id: 2, title: 'React 实战项目' },
  { id: 3, title: 'JavaScript 高级特性' },
  { id: 4, title: 'Node.js 后端开发' },
  { id: 5, title: 'HTML5 新特性详解' },
  { id: 6, title: 'CSS3 动画效果' },
  { id: 7, title: 'Vue 3 状态管理' },
  { id: 8, title: 'React 路由配置' },
]

// 控制搜索框显示状态
const showSearch = ref(false)
// 搜索关键词
const searchKeyword = ref('')
// 当前选中的搜索结果索引
const selectedIndex = ref(-1)

// 实时搜索结果，显示所有匹配结果
const searchResults = computed(() => {
  if (!searchKeyword.value) return []
  return mockData.filter(item => item.title.toLowerCase().includes(searchKeyword.value.toLowerCase()))
})

// 清空搜索内容
const clearSearch = () => {
  searchKeyword.value = ''
  selectedIndex.value = -1
}

// 执行搜索的函数
const performSearch = () => {
  if (selectedIndex.value > -1) {
    const selectedResult = searchResults.value[selectedIndex.value]
    console.log('跳转至:', selectedResult.title)
    // 这里可以添加跳转逻辑
    showSearch.value = false
  }
}

// 高亮搜索词
const highlightKeyword = (text) => {
  if (!searchKeyword.value) return text
  const regex = new RegExp(searchKeyword.value, 'gi')
  return text.replace(regex, match => `<span class="highlight">${match}</span>`)
}

// 处理键盘事件
const handleKeyDown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % searchResults.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + searchResults.value.length) % searchResults.value.length
  } else if (e.key === 'Enter') {
    performSearch()
  } else if (e.key === 'Escape') {
    showSearch.value = false  
  }
}

// 点击搜索框以外区域关闭搜索框
const closeSearchOnOutsideClick = (event) => {
  const searchBox = event.currentTarget.querySelector('.search-box')
  if (!searchBox.contains(event.target)) {
    showSearch.value = false
  }
  clearSearch()
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
                  <a v-if="subItem.to && subItem.to.startsWith('http')" class="dropdown-item" :href="subItem.to" target="_blank" rel="noopener noreferrer">
                    {{ subItem.text }}
                  </a>
                  <router-link
                    v-else-if="subItem.divider !== true"
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
          <button 
            @click="showSearch = true" 
            class="btn btn-outline-secondary d-flex align-items-center search-btn"
          >
            <i class="bi bi-search me-2"></i>
            <span>搜索</span>
            <span class="ms-2 small">(快捷键: Ctrl + K)</span>
          </button>
          <!-- 用户信息logo开始 -->
          <UserInfoLogo :arr = "userInfoLogo"/>
          <!-- 用户信息logo结束 -->
        </div>
      </div>
    </nav>
    <!-- 搜索框 -->
    <div v-if="showSearch" class="search-overlay" @click="closeSearchOnOutsideClick">
      <div class="search-box" @keydown="handleKeyDown">
        <!-- 搜索框样式 -->
        <div class="input-group search-input-group">
          <span class="input-group-text search-icon">
            <i class="bi bi-search"></i>
          </span>
          <input 
            v-model="searchKeyword"
            type="text" 
            class="form-control" 
            placeholder="搜索文章..."
            @input="performSearch"
          />
          <span 
            v-if="searchKeyword.length > 0" 
            class="input-group-text clear-icon" 
            @click="clearSearch"
          >
            <i class="bi bi-x-circle"></i>
          </span>
        </div>
        <!-- 搜索结果列表 -->
        <div class="search-results" v-if="searchResults.length">
          <ul>
            <li
              v-for="(result, index) in searchResults"
              :key="result.id"
              :class="{ 'selected': index === selectedIndex }"
              @click="selectedIndex = index; performSearch()"
              v-html="highlightKeyword(result.title)"
            ></li>
          </ul>
        </div>
        <!-- 操作提示 -->
        <div class="search-tips">
          <span>
            <kbd><i class="bi bi-arrow-return-left"></i></kbd> 选择
          </span>
          <span>
            <kbd>Esc</kbd> 关闭搜索
          </span>
          <span>
            <kbd>↑</kbd> / <kbd>↓</kbd> 选择
          </span>
        </div>
      </div>
    </div>
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
        // 子菜单
        ul {
          background: var(--theme-second-bg);
          box-shadow: 1px 1px 4px var(--theme-accent-color);
          li {
            a {
            transition: all .5s;

              color: var(--color-heading);
              // 触碰子菜单时修改背景颜色
              &:hover {
                background-color: var(--search-highlight-bg);
              }
            }
          }
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

// 搜索框遮罩层样式
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 让搜索框靠上 */
  padding-top: 10%; /* 调整搜索框距离顶部的距离 */
  z-index: 99;

  // 搜索框样式
  .search-box {   
    background-color: var(--theme-second-bg);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%; /* 调整搜索框宽度 */
  }

  input {
    background-color: var(--theme-main-bg);
    color: var(--color-heading);
  }
  input::placeholder {
    color: var(--color-heading);
  }

  .search-results {
    width: 100%;
    // 计算 10 条结果的大致高度，可根据实际情况调整
    max-height: calc(10 * (0.5rem + 1rem + 1px)); 
    overflow-y: auto;
    border-top: none;
    margin-bottom: 1rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 10px;

      li {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border: 1px solid var(--search-border-color);
        border-radius: 5px;
        margin-bottom: 0.5rem;
        transition: background-color 0.3s ease;
        font-size: 1rem;
        color: var(--color-heading);


        &:hover {
          background-color: var(--search-highlight-bg);
          border-color: var(--search-border-highlight-color);
        }

        &.selected {
          background-color: var(--theme-card-highlight);
        }

        .highlight {
          background-color: yellow;
          font-weight: bold;
        }
      }
    }
  }

  .search-tips {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: var(--color-heading);
    margin-top: 10px;

    kbd {
      background-color: var(--color-heading);
      color: var(--theme-second-bg);
      padding: 0.1rem 0.4rem;
      border-radius: 0.2rem;
    }
  }
}

.search-btn {
  border-radius: 50rem;
  padding: 0.375rem 1rem;
  background-color: transparent; // 确保背景透明

  // 悬停状态
  &:hover {
    background-color: transparent; // 保持背景透明
    // border-color: darken(var(--color-heading), 20%) !important; // 加重边框颜色
    border: 1px solid var(--color-heading)!important; // 加粗边框;
    color: var(--color-heading); // 保持文字颜色
  }
}
</style>