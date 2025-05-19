<script setup>
import { userUpdateUserInfo } from '@/api/userService'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
const {
  userInfo: { username, nickname, email, id },
  getUserInfo
} = useUserStore()

const user = ref({
  username,
  nickname,
  email,
  id
})

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const formRef = ref()

// 获取用户信息


// 提交修改
const submitForm = async () => {
  // 二次校验
  await formRef.value.validate()
  // 提交修改
  await userUpdateUserInfo(user.value)
  // 通知user模块更新用户信息
  getUserInfo()
  ElMessage.success('修改成功')
}

</script>

<template>
  <div id="user-info">
    <!-- 基本信息 -->
    <page-container title="基本资料">
      <el-row>
        <el-col :span="12">
          <el-form
            :model="user"
            :rules="rules"
            ref="formRef"
            label-width="100px"
            size="large">
            <el-form-item label="登录账号">
              <el-input v-model="user.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm" type="primary">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </page-container>
  </div>
</template>


<style lang="scss">
#user-info {
  .page-container {
    .el-card__header {
      // border: 1px solid var(--theme-main-bg);
    }

    .el-row {
      justify-content: center;

      .el-col-12 {
        flex: 0 0 60%;
        max-width: 60%;

        // 输入框背景色
        .el-input__wrapper {
          background: var(--theme-second-bg);
        }
      }
    } 
  }
}
</style>