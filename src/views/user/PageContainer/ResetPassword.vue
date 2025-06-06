<script setup>
import { ref } from 'vue'
import { userUpdatePwd } from '@/api/userService'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()

// 提取正则表达式为常量
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{6,12}$/

const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.old_pwd) {
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    cb()
  }
}

const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.new_pwd) {
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    cb()
  }
}

const rules = {
  // 原密码
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: PASSWORD_REGEX,
      message: '密码长度必须是 6-12 位，且必须包含字母和数字',
      trigger: 'blur'
    }
  ],
  // 新密码
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: PASSWORD_REGEX,
      message: '密码长度必须是 6-12 位，且必须包含字母和数字',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 确认新密码
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: PASSWORD_REGEX,
      message: '密码长度必须是 6-12 位，且必须包含字母和数字',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}

const formRef = ref()

const onSubmit = async () => {
  const res = await userUpdatePwd({ oldPwd: pwdForm.value.old_pwd, newPwd: pwdForm.value.new_pwd })
  if (res.data.status === 0) 
    ElMessage.success({ type: 'success', message: res.data.msg })
  else
    return ElMessage.error({ type:'error', message: res.data.msg })
  userStore.logout()
  router.push('/login')
}

const onReset = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>