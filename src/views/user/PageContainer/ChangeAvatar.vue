<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { userUpdateAvatar } from '@/api/userService'

// 初始化头像图片链接
const uploadRef = ref(null) // 上传组件实例
const base64Data = ref(null) // 图片的base64编码
const imgUrl = ref(userStore.userInfo.user_pic)
const onSelectFile = (uploadFile) => {
  // 生成临时图片 URL
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  const reader = new FileReader() // 创建文件读取器对象
  reader.readAsDataURL(uploadFile.raw) // 读取文件内容为base64编码
  reader.onload = (e) => { // 读取完成后执行的回调函数
    // 将读取到的base64编码赋值给base64Data变量，并截取掉开头的"data:image/png;base64,"部分
    base64Data.value = e.target.result.split(',')[1]
  }
  reader.onerror = () => { // 读取失败后执行的回调函数
    ElMessage.error('读取文件失败')
  }  
}

// 上传头像
const uploadAvatar = async () => {
  console.log(base64Data.value) // 打印base64编码，用于调试

  if (!base64Data.value) { // 检查是否有图片数据
    return ElMessage.error('请选择图片')
  }
  const res = await userUpdateAvatar(base64Data.value) // 调用接口上传头像
  console.log(res)
}
</script>
<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <!-- 若有图片链接则显示图片 -->
      <img v-if="imgUrl" :src="imgUrl" class="avatar" /> 
      <!-- 若无图片链接则显示添加图标 -->
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> 
    </el-upload>
    <div class="button">
      <el-button
        @click="$refs.uploadRef.$el.querySelector('input').click()"
        type="primary"
        :icon="Plus"
        size="large"
        >选择图片</el-button>
      <el-button
        @click="uploadAvatar"
        type="primary"
        :icon="Upload"
        size="large"
        >上传头像</el-button>
    </div>
  </page-container>
</template>
<style lang="scss" scoped>
.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .button{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 300px;
  }
}

.avatar-uploader {
  display: flex;
  justify-content: center;
}

.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>