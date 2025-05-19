<script setup>
import { ref, onMounted, computed } from 'vue'
import { articleGetPublicAllArticleTags } from '@/api/articlePublicService'
import SliderNavbar from './SliderNavbar.vue'

// 模拟标签数据，实际开发中可从后端获取
const tags = ref([])

const typeColors = [
  { backgroundColor: `var(--tag-color-1-bg)`, color: `var(--tag-color-1-text)`, border: `1px solid var(--tag-color-1-border)` },
  { backgroundColor: `var(--tag-color-2-bg)`, color: `var(--tag-color-2-text)`, border: `1px solid var(--tag-color-2-border)` },
  { backgroundColor: `var(--tag-color-3-bg)`, color: `var(--tag-color-3-text)`, border: `1px solid var(--tag-color-3-border)` },
  { backgroundColor: `var(--tag-color-4-bg)`, color: `var(--tag-color-4-text)`, border: `1px solid var(--tag-color-4-border)` }
] 

onMounted(async () => {
  // 从后端获取标签数据
  const res = await articleGetPublicAllArticleTags()
  tags.value = res.data.data
})

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * typeColors.length)
  return typeColors[randomIndex]
}

// 计算每个标签的样式
const tagStyles = computed(() => {
  return tags.value.map(() => getRandomColor())
})

</script>

<template>
  <div id="person-tags">
    <div class="tags-container">
      <div class="title">
        <i class="bi bi-tag-fill"></i>
        <h1 class="tags-title">标签</h1>
      </div>
      <div class="tags-list">
        <div 
          v-for="(tag, index) in tags" 
          :key="index" 
          class="tag-item"
          :style="{ 
            backgroundColor: tagStyles[index].backgroundColor, 
            color: tagStyles[index].color,
            border: tagStyles[index].border
          }"
        >
          <span class="tag-name">{{ tag.tag_name }}</span>
          <div class="tag-vertical"></div>
          <span class="tag-count">{{ tag.tag_count }}</span>
        </div>
      </div>
    </div>
    <SliderNavbar/>
  </div>
</template>

<style scoped lang="scss">
#person-tags {
  .tags-container {
    padding: 20px;
    background-color: var(--theme-second-bg);
    border-radius: 14px;
    min-height: 300px;
    height: 45vh;

    // 标题样式开始
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      color: var(--color-heading);

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
}
</style>