<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'

// 分类数据（包含展开状态）
const categories = ref([
  { name: '前端', isOpen: false, children: ['Vue3', 'React', 'TypeScript'] },
  { name: '后端', isOpen: false, children: ['Node.js', 'Spring Boot'] },
  { name: '移动端', isOpen: false, children: ['Flutter', 'Swift'] },
  { name: '开发工具', isOpen: false, children: ['VSCode', 'Webpack'] },
  { name: '其它', isOpen: false, children: ['设计模式', '算法'] }
])

// 切换展开状态
const toggle = (index) => {
  categories.value = categories.value.map((cat, i) => 
    i === index ? { ...cat, isOpen: !cat.isOpen } : cat
  )
}
</script>

<template>
  <div id="categories">
    <page-container title="分类">
      <ul>
        <li v-for="(category, index) in categories" :key="index" @click="toggle(index)">
          <!-- 动态图标 -->
          <i 
            :class="[
              'bi',
              category.isOpen ? 'bi-folder2-open' : 'bi-folder2',
              'icon'
            ]"
          ></i>
          
          <!-- 主分类名称 -->
          <span class="category-name">{{ category.name }}</span>
          
          <!-- 子分类列表 -->
          <ul v-if="category.isOpen" class="children">
            <li v-for="(child, i) in category.children" :key="i">
              {{ child }}
            </li>
          </ul>
        </li>
      </ul>
    </page-container>
  </div>
</template>

<style scoped lang="scss">
#categories {
  .page-container {
    ul {
      font-size: 20px;
      list-style: none;
      padding-left: 0;

      li {
        cursor: pointer;
        margin: 8px 0;
        padding: 8px;
        transition: all 0.2s;

        &:hover {
          background-color: #f5f7fa;
        }

        .icon {
          margin-right: 10px;
          color: var(--text-heading);
          font-size: 1.2em;
          vertical-align: middle;
        }

        .category-name {
          vertical-align: middle;
        }

        .children {
          margin-left: 24px;
          font-size: 16px;
          color: #666;
          list-style: disc;
          padding-left: 20px;
          margin-top: 8px;

          li {
            margin: 4px 0;
            padding: 4px;
            
            &:hover {
              background-color: #eee;
            }
          }
        } 
      }
    }
  }
}
</style>