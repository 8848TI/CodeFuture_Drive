<script setup>
import FooterInfo from '@/components/FooterInfo.vue'

</script>
const goToGithub = () => {
  
}
<template>
  <div id="home">
    <!-- 博客主页标题 -->
    <div class="content">
      <h1>码动未来</h1>
      <!-- 博客简介 -->
      <p>博客 笔记 文档</p>  
      <p>这是一个编程小白的个人笔记</p>
    </div>
    <!-- 博客主页操作按钮 -->
    <div class="action">
      <router-link to='/blog'>博客</router-link>
      <a href="https://github.com/8848TI/CodeFuture_Drive" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
  </div>
  <!-- 页脚 -->
  <FooterInfo style="height: 20%;"/>
</template>

<style scoped lang="scss">
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  text-align: center;

  .content {
    h1 {
      font-size: 4rem;
      margin: 0;
      font-weight: 800;
      color: var(--homepage-text-level-1);
    }

    :nth-child(2) {
      font-size: 4rem;
      font-weight: 800;
      color: var(--homepage-text-level-2);
    }

    :nth-child(3) {
      font-size: 1rem;
      color: var(--homepage-text-level-3);
    }
  }

  // 主要操作按钮开始
  .action {
    margin-top: 1rem;

    a {
      display: inline-block;
      width: 6rem;
      height: 2.5rem;
      margin: 0 0.5rem;
      padding: 0.5rem 1rem; // 统一基础内边距
      border-radius: 1.5rem;
      text-decoration: none;
      transition: background-color 0.3s ease;
      position: relative;
    }

    a:nth-child(1) {
      font-weight: 700;
      letter-spacing: 0.1rem;
      background-color: var(--button-primary-bg);
      color: var(--button-primary-text);
      padding: 0.5rem 1rem; // 恢复原本的内边距，保证文字居中

      &:hover {
        background-color: var(--button-primary-hover);
      }
    }

    a:nth-child(2) {
      background-color: var(--button-secondary-bg);
      color: var(--button-secondary-text);
      padding: 0.5rem 1rem; // 恢复原本的内边距，保证文字居中
      font-weight: 400;
      padding-right: 1.5rem; // 为箭头腾出额外空间

      &:hover {
        background-color: var(--button-secondary-hover);
      }

      &::after {
        content: '→';
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
