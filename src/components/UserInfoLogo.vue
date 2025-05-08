<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index'
import { ref, defineProps } from 'vue'
import { useThemeStore } from '@/stores/index'
import avatarImg from '@/assets/images/avatar.png'

const router = useRouter()
const userStore = useUserStore()
const theme = useThemeStore()

// 按钮状态
const isDarkTheme = ref(theme.theme === 'light')
// 切换主题的函数
const themeSwitch = () => {
  theme.toggleTheme()
}

// 模拟登录和退出登录
const login = () => {
  // 前往登录界面
  router.push({ path: '/login' })

  // userStore.login({ avatar: avatarImg })
}

const logout = () => {
  userStore.logout()
}

// 定义组件的props
const props = defineProps({
  arr: {
    type: Array,
    default: () => [
      { text: '个人空间', to: '/user' },
      { text: '管理博客', to: '/admin' }
    ]
  }
})
console.log(typeof(userStore.userInfo.role))
</script>

<template>
  <li class="nav-item dropdown user-dropdown">
    <a
      class="nav-link dropdown-toggle user-link"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div class="user-avatar">
        <img
          v-if="userStore.isLoggedIn"
          :src="userStore.userInfo.avatar"
          alt="用户头像"
          class="rounded-circle"
        />
        <!-- <i v-else class="bi bi-person-circle"></i> -->
        <i v-else>登录</i>
      </div>
    </a>
    <ul class="dropdown-menu dropdown-menu-end user-dropdown-menu">
      <li v-if="userStore.token">
        <router-link v-if="userStore.userInfo.role === 'admin'" class="dropdown-item user-dropdown-item" :to="arr[1].to">
          <i class="bi bi-person-lines-fill me-2"></i>{{ arr[1].text }}
        </router-link>
        <router-link v-else class="dropdown-item user-dropdown-item" :to="arr[0].to">
          <i class="bi bi-person-lines-fill me-2"></i>{{ arr[0].text }}
        </router-link>
      </li>
      <li v-if="userStore.token">
        <a class="dropdown-item user-dropdown-item" @click="logout">
          <i class="bi bi-box-arrow-right me-2"></i>退出登录
        </a>
      </li>
      <li v-else>
        <a class="dropdown-item user-dropdown-item" @click="login">
          <i class="bi bi-box-arrow-in-right me-2"></i>登录
        </a>
      </li>
    </ul>
  </li>
</template>
<style lang="scss" scoped>
// 头像下拉菜单样式开始
.dropdown-toggle::after {
      color: var(--color-heading);
    }
    .user-dropdown {
      margin-left: 1rem; // 添加左侧间距

      .user-link {
        display: flex;
        align-items: center;
        padding: 0;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--theme-second-bg);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: scale(1.05); // 悬停时放大
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        i {
          font-size: .9rem;
          color: var(--color-heading);
        }
      }

      .user-dropdown-menu {
        min-width: 150px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background-color: var(--theme-second-bg);

        .user-dropdown-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          color: var(--color-heading);
          transition: background-color 0.2s ease-in-out;

          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          i {
            font-size: 1.2rem;
          }
        }
      }
    }
    // 头像下拉菜单样式结束
</style>