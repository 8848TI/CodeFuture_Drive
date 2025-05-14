<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
import { userUpdateAvatar } from '@/api/userService'
import Cropper from "vue3-cropper"
import 'vue3-cropper/lib/vue3-cropper.css'

// 初始化头像图片链接
const uploadRef = ref(null) // 上传组件实例
const cropperRef = ref(null) // 裁剪组件实例
const imgUrl = ref(userStore.userInfo.user_pic)
const cropperVisible = ref(false) // 裁剪组件的显示状态
const previewImage = ref(null) // 裁剪后的图片链接

const onSave = (res) => {
  previewImage.value = res // 保存裁剪后的图片链接
  cropperVisible.value = false // 隐藏裁剪组件
}

const onCancel = () => {
  cropperVisible.value = false // 隐藏裁剪组件
}

const onSelectFile = (uploadFile) => {
  cropperVisible.value = true // 显示裁剪组件
  // 生成临时图片 URL
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
}

// 上传头像
const uploadAvatar = async () => {
    // 截取图片链接中的 base64 部分
  // const base64Image = previewImage.value.split(',')[1]
  console.log(previewImage.value)

  const res = await userUpdateAvatar(previewImage.value)
  console.log(res)
  if (res.data.status === 0) {
    ElMessage.success({ type: 'success', message: res.data.msg })
    await userStore.getUserInfo() // 更新用户信息
  } else {
    ElMessage.error({ type:'error', message: res.data.msg })
  }
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
    <Cropper
      v-if="cropperVisible"
      ref="cropperRef"
      :src="imgUrl"
      :imagePath="imgUrl"
      :fixedBox="true"
      @save="onSave"
      @cancel="onCancel"
    />
    <img v-if="previewImage" :src="previewImage" alt="预览图" style="max-width: 100%; max-height: 100%;">
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