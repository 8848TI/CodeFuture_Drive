<script setup>
import { defineProps } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  author: {
    type: String,
    default: '未知作者'
  },
  date: {
    type: String,
    default: '未知日期'
  },
  excerpt: {
    type: String,
    default: '在编程的世界里，技术的发展日新月异，每天都有新的框架、工具和方法涌现。对于编程小白来说，要跟上这快速的节奏并不容易。本博客旨在记录学习过程中的点点滴滴，分享编程教程、工具安装指南以及实用的编码技巧，帮助大家更好地掌握编程技能。无论是前端的 HTML、CSS、JavaScript，还是后端的 Python、Java、Node.js，这里都可能找到你需要的知识。让我们一起在编程的道路上不断探索，共同成长。'
  },
  imageUrl: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="../assets/images/07.jpg" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title text-truncate">{{ title }}</h5>
          <p class="card-text excerpt-text">{{ excerpt }}</p>
          <p class="card-text"><small class="text-muted">{{ date }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 可在此添加自定义样式 */
.card {
  border: none;
  border-radius: 16px;
  background-color: var(--theme-second-bg);
  box-shadow: 1px 2px 2px var(--theme-card-highlight);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 1px 4px 8px var(--theme-card-hover-shadow);
  }

 .col-md-4 {
    img {
      width: 100%;
      height: 100%;
      /* 让图片按比例缩放并覆盖整个容器，保证图片不会拉伸变形 */
      object-fit: cover;
      /* 保证图片圆角与卡片一致 */
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
  }

  .col-md-8 {
    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      
      .card-title {
        color: var(--color-heading);
      }

      .text-truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .excerpt-text{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* 控制显示的行数 */
        overflow: hidden;
        color: var(--color-text);
      }

      .card-text  {
        small {
          color: var(--color-text) !important;
        }
      }
    }
  }

}
</style>