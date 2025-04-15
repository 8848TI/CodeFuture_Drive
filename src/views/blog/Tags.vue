<script setup>
import { ref } from 'vue'

// 模拟标签数据，实际开发中可从后端获取
const tags = ref([
  { name: 'Vue', count: 15 },
  { name: 'React', count: 12 },
  { name: 'JavaScript', count: 20 },
  { name: 'Python', count: 8 },
  { name: 'HTML', count: 10 },
  { name: 'CSS', count: 9 },
  { name: 'TypeScript', count: 13 },
  { name: 'Node.js', count: 18 },
  { name: 'Express', count: 11 },
  { name: 'MongoDB', count: 7 },
  { name: 'Git', count: 14 },
  { name: 'Webpack', count: 6 },
  { name: 'Babel', count: 16 }
]);
</script>

<template>
  <div class="tags-container">
    <div class="title">
      <i class="bi bi-tag-fill"></i>
      <h1 class="tags-title">标签</h1>
    </div>
    <div class="tags-list">
      <div v-for="tag in tags" :key="tag.name" class="tag-item">
        <span class="tag-name">{{ tag.name }}</span>
        <div class="tag-vertical"></div>
        <span class="tag-count">{{ tag.count }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 14px;

  // 标题样式开始
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    i {
      font-size: 24px;
      margin-right: 10px;
    }

    .tags-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 24px;
    }
  }
  // 标题样式结束
  // 标签列表样式开始
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .tag-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 14px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 80px;
      transition: background-color 0.3s ease;

      .tag-name {
        font-size: 12px;
      }

      .tag-vertical {
        width: 1px;
        height: 20px;
        background-color: #ddd;
        margin: 0 10px;
      }

      .tag-count {
        font-size: 14px;
        color: #666;
      }

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
  // 标签列表样式结束

}




</style>