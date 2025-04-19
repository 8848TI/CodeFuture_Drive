<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 初始化头像图片链接
const imgUrl = ref('') 
const onSelectFile = (uploadFile) => {
  // 生成临时图片 URL
  imgUrl.value = URL.createObjectURL(uploadFile.raw) 
}
</script>
<template>
  <page-container title="更换头像">
    <el-upload
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
        >选择图片</el-button
      >
    </div>
    <!-- 移除上传图像按钮 -->
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