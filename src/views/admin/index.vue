<script setup>
import Avatar from '@/assets/images/tb.jpg'
import { useRouter } from 'vue-router'
const router = useRouter()
import {
  HomeFilled,
  Collection,
  Grid,
  Comment,
  User,
  SwitchButton
} from '@element-plus/icons-vue'

// 头部导航栏
const handleCommand = async (key) => {
  console.log(key === 'logout')
  if (key === 'logout') {
    // 退出操作
    await ElMessageBox.confirm('你确定退出吗', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })

    // 清除本地信息 (token + user信息)

    router.push('/home')
  } else {
    // 跳转操作
    router.push(`/admin/${key}`)
  }
}
</script>

<template>
  <div id="admin">
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="el-aside__logo">码动未来</div>
            <el-menu
                active-text-color="#ffd04b"
                background-color="#232323"
                :default-active="$route.path"
                text-color="#fff"
                router>
                <el-menu-item index="/admin">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/admin/blogmanagement">
                  <el-icon><Collection /></el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/categorymanagement">
                    <el-icon><Grid /></el-icon>
                    <span>分类管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/reviewsmanagement">
                    <el-icon><Comment /></el-icon>
                    <span>评论管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/usermanagement">
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div>管理员：
                    <strong>德玛西亚</strong>
                </div>
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <!-- 下拉菜单展示部分 -->
                    <span class="el-dropdown__box">
                      <el-avatar :src="Avatar" />
                      <el-icon><CaretBottom /></el-icon>
                    </span>
                    <!-- 折叠部分 -->
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="blogmanagement" :icon="Collection">文章管理</el-dropdown-item>
                        <el-dropdown-item command="categorymanagement" :icon="Grid">分类管理</el-dropdown-item>
                        <el-dropdown-item command="reviewsmanagement" :icon="Comment">评论管理</el-dropdown-item>
                        <el-dropdown-item command="usermanagement" :icon="User">用户管理</el-dropdown-item>
                        <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item >
                      </el-dropdown-menu>
                    </template>
                    </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>码动未来 ©2023 管理员 管理页面</el-footer>
        </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: var(--theme-main-bg);

  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
    //   background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
