<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus' // 引入 Element Plus 消息提示

// 初始化 Vditor 编辑器
const vditor = ref()
// 控制弹框和遮罩层的显示
const showDialog = ref(false)
// 控制发布博客表单的显示
const showPublishForm = ref(false) 
const router = useRouter()

// 模拟标签和分类数据
const tags = ['HTML', 'CSS', 'Javascript', 'Canvas', 'Vue', 'Rect', 'Web',
              'Java', 'Spring', 'C', 'C++', 'C#', 'Go', 'Python',
              'Android', 'HarmonyOS', 'UniApp',
              'git', 'VSCode',
              '数据结构', '算法',
              '操作系统', '数据库', 'Docker',
              '其它']
const categories = ['前端开发', '后端开发', '移动端开发', '开发工具', '数据结构与算法', '其它']

// 表单数据
const form = ref({
  tags: [],
  cover: null,
  summary: '',
  category: ''
})

// 表单验证规则
const rules = {
  tags: [{ type: 'array', required: true, message: '请选择文章标签', trigger: 'change' }],
  summary: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
  category: [{ required: true, message: '请选择文章专栏', trigger: 'change' }]
}

// 在组件挂载后初始化编辑器
onMounted(() => {
  vditor.value = new Vditor('vditor',{
    height: '95vh',
    width: '100vw',
    // 添加主题
    theme: {
      current: 'dark' // 或者 'light'
    },
    // 内容主题
    contentTheme: {
      current: 'dark' // 或者 'light'
    }
  })
})

// 点击返回上一页按钮，显示弹框
const goBack = () => {
  showDialog.value = true
}

// 确认离开
const confirmLeave = () => {
  router.push('/user')
  showDialog.value = false
}

// 取消离开
const cancelLeave = () => {
  showDialog.value = false
}

// 定时发布按钮点击事件
const schedulePublish = () => {
  console.log('定时发布')
}

// 发布博客按钮点击事件，显示发布表单
const publishBlog = () => {
  showPublishForm.value = true
}

// 实际发布博客的函数
const submitPublishForm = () => {
  console.log('实际发布博客操作', form.value)
  alert('实际发布博客操作')
  showPublishForm.value = false
}

// 取消发布
const cancelPublish = () => {
  showPublishForm.value = false
}

// 新增封面预览地址
const coverUrl = ref('')

// 处理封面上传
const handleCoverUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.cover = file
    coverUrl.value = URL.createObjectURL(file)
  }
}

</script>

<template>
  <div id="add-article">
    <div id="vditor"></div>
    <!-- 底部使用 Bootstrap 实现固定定位和响应式布局 -->
    <div class="fixed-bottom bg-white py-2 border-top">
      <div class="container d-flex justify-content-between">
        <div class="container d-flex justify-content-start">
          <button 
            type="button" 
            class="btn btn-secondary me-2" 
            @click="goBack"
          >
            回到个人空间
          </button>
        </div>
        <div class="container d-flex justify-content-end">
          <button 
            type="button" 
            class="btn btn-secondary me-2" 
            @click="schedulePublish"
          >
            定时发布
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="publishBlog"
          >
            发布博客
          </button>
        </div>
      </div>
    </div>
    <!-- 使用 transition 组件添加遮罩层动画 -->
    <transition name="fade">
      <div v-if="showDialog || showPublishForm" class="overlay" @click="showPublishForm ? cancelPublish : cancelLeave"></div>
    </transition>
    <!-- 使用 transition 组件添加弹框动画 -->
    <transition name="dialog">
      <div v-if="showDialog" class="dialog">
        <p>确认离开当前页面吗？</p>
        <button @click="confirmLeave">确认</button>
        <button @click="cancelLeave">取消</button>
      </div>
    </transition>
    <!-- 发布博客的表单 -->
    <transition name="dialog">
      <div v-if="showPublishForm" class="dialog publish-form">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="responsive-form">
          <!-- 文章标签 -->
          <el-form-item label="文章标签" prop="tags">
            <el-select v-model="form.tags" multiple placeholder="请选择文章标签">
              <el-option
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                :value="tag">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 添加封面 -->
          <el-form-item label="添加封面">
            <input 
              type="file" 
              class="form-control" 
              @change="handleCoverUpload"
            >
            <!-- 封面预览 -->
            <div v-if="coverUrl" class="cover-preview">
              <img :src="coverUrl" alt="封面预览" class="cover-image">
            </div>
          </el-form-item>
          <!-- 文章摘要 -->
          <el-form-item label="文章摘要" prop="summary">
            <el-input
              type="textarea"
              v-model="form.summary"
              :rows="3"
              placeholder="请输入文章摘要">
            </el-input>
          </el-form-item>
          <!-- 文章专栏 -->
          <el-form-item label="文章专栏" prop="category">
            <el-select v-model="form.category" placeholder="请选择文章专栏">
              <el-option
                v-for="cat in categories"
                :key="cat"
                :label="cat"
                :value="cat">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitPublishForm">确认发布</el-button>
            <el-button @click="cancelPublish">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
#add-article {
  position: relative;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    background-color: #fff;
    z-index: 1001;
    border-radius: 4px;
    text-align: center;

    button {
      margin: 0 10px;
      padding: 5px 15px;
    }
  }

  .publish-form {
    width: 600px;
    text-align: left;

    @media (max-width: 768px) {
      width: 90%;
    }
  }

  .cover-preview {
    margin-top: 10px;
    max-width: 200px;
  }

  .cover-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
}

/* 遮罩层淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 弹框缩放动画 */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>