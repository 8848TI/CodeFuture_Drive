<script setup>
import BaseInfo from './PageContainer/BaseInfo.vue'
import ChangeAvatar from './PageContainer/ChangeAvatar.vue'
import ResetPassword from './PageContainer/ResetPassword.vue'
import SliderNavbar from './SliderNavbar.vue'
</script>

<template>
  <div id="user-info">
    <el-row :gutter="20">
      <!-- 响应式布局，移动端占 24 栅格，桌面端占 24 栅格 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="card-wrapper">
          <BaseInfo />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="card-wrapper">
          <ChangeAvatar />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="card-wrapper">
          <ResetPassword />
        </div>
      </el-col>
    </el-row>
    <SliderNavbar />
  </div>
</template>

<style lang="scss" scoped>
#user-info {
  .el-col {
    .card-wrapper {
      margin-bottom: 20px; // 为每个卡片添加底部外边距
      border-radius: 8px; // 设置卡片圆角
      padding: 20px; // 卡片内边距
      width: 100%;

      &:last-child {
        margin-bottom: 0; // 最后一个卡片不添加底部外边距
      }
    }
  }
}
// @media (max-width: 1200px) {
//   #user-info {
//     width: 300px;
//     .el-col {
//       width: 300px;
//       .card-wrapper {
//         padding: 15px; // 移动端减小内边距
//         width: 80%;
//       }
//     }
//   }
// }
</style>