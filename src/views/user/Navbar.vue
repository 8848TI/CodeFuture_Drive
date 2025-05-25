<script setup>
import { ref } from 'vue'
import { useUserStore, useThemeStore } from '@/stores'
const userStore = useUserStore()
const themeStore = useThemeStore()

// 空图片
import Avatar from '@/assets/images/avatar.png'
const avatar = userStore.userInfo.avatar_path || Avatar


// 普通导航项
const normalNavItems = ref([
  { text: '博客文章', to: '/user', active: true },
  { text: '文章标签', to: '/user/personalarticel' },
  { text: '修改信息', to: '/user/userinfo' },
  { text: '回到首页', to: '/home' },
  { text: '离开', to: '/login' }
])

// 控制导航栏折叠状态
const isNavCollapsed = ref(true);

// 处理导航项点击事件，更新选中状态
const handleNavClick = (item) => {
  // 重置所有导航项的 active 状态
  normalNavItems.value.forEach((navItem) => {
    navItem.active = false;
  });
  // 设置当前点击的导航项的 active 为 true
  item.active = true;

  if (item.text === '离开') {
    userStore.logout()
  }
}

const open = (e) => {
  // 需要默认的提交事件
  e.preventDefault()
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

</script>

<template>
  <div id="navbar">
    <!-- 汉堡菜单按钮 -->
    <button 
      class="navbar-toggle" 
      @click="isNavCollapsed = !isNavCollapsed"
      :aria-expanded="!isNavCollapsed"
    >
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <ul :class="{ 'collapsed': isNavCollapsed }">
      <li>
        <div class="nickname">{{ userStore.userInfo.nickname }}</div>
        <div class="avatar">
          <img :src="avatar" alt="">
        </div>
      </li>
      <li v-for="item in normalNavItems" :key="item.text">
        <router-link 
          :to="item.to" 
          :class="{ active: item.active }"
          @click="(e) => {
            if (item.text === '回到首页') open(e)
            handleNavClick(item)
          }"
        >
          {{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  background-color: var(--theme-second-bg);

  .navbar-toggle {
    display: none;
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    background-color: var(--color-heading);
    margin: 4px 0;
  }

  ul {
    position: relative;
    display: flex;
    width: 1000px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
    flex-wrap: nowrap; 

    li:first-child {
      width: 200px;
      height: 100%;

      .nickname {
        position: absolute;
        top: -150%;
        left: 20%;
        color: #fff;
        font-size: 20px;
      }

      .avatar {
        position: absolute;
        bottom: calc(50% - 5px);
        width: 150px;
        height: 150px;
        margin: 0 auto;
        overflow: hidden;
        border: 3px solid var(--theme-second-bg);
        border-radius: 5%;
        z-index: 1;

        img {
          width: 100%;
          height: 100%;
        } 
      }
    }
    
    li {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      min-width: fit-content; 

      a {
        text-decoration: none;
        color: var(--color-heading);
        transition: all 0.3s ease; 
        padding: 5px;
      }

      a:hover {
        color: var(--theme-accent-color);
        border-bottom: 4px solid var(--theme-accent-color);
      }

      .active {
        color: var(--theme-accent-color);
        border-bottom: 4px solid var(--theme-accent-color);
        font-weight: 700;
      }
    }

  }

  // 小屏幕下的样式
  @media screen and (max-width: 1000px) {
    ul {
      width: 100%;
      padding: 0 15px;
    }

    li:first-child {
      width: 120px; // 缩小头像所在 li 的宽度

      .nickname {
        left: 30% !important;
      }
    }

    li:first-child .avatar {
      width: 100px;
      height: 100px;
      position: relative; // 改为相对定位，避免遮挡
      bottom: auto;
      margin: 0;
      z-index: 1;
    }

    li {
      font-size: 14px;
    }
  }

  // 更小屏幕下的样式
  @media screen and (max-width: 600px) {
    .navbar-toggle {
      display: block;
    }

    ul {
      display: none;
      flex-direction: column;
      width: 100%;
      flex-wrap: wrap; 
      overflow-x: visible;

      &.collapsed {
        display: none;
      }

      &:not(.collapsed) {
        display: flex;
      }

      li:first-child {
        width: 100%;
        position: relative;
      }

      li:first-child .avatar {
        position: relative;
        margin: 20px auto;
      }

      li {
        width: 100%;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>