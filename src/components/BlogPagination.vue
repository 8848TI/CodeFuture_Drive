<script setup>
import { defineEmits, defineProps, computed } from 'vue'
const emits = defineEmits(['page-change'])
const props = defineProps({// 定义组件的props
  currentPage: { // 当前页码
    type: Number,
    default: 1
  },
  pageSize: { // 每页显示的数量
    type: Number,
    default: 10
  },
  total: { // 总数量
    type: Number,
    default: 100
  },
  maxVisiblePages: { // 最大可见页码数
    type: Number,
    default: 5
  }
})

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
// 生成页码列表
const pageNumbers = computed(() => {
  const { currentPage, maxVisiblePages } = props
  const total = totalPages.value
  let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let end = start + maxVisiblePages - 1

  if (end > total) {
    end = total
    start = Math.max(1, end - maxVisiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 处理上一页逻辑
const handlePrevPage = () => {
  if (props.currentPage > 1) {
    emits('page-change', props.currentPage - 1)
  }
}
// 处理下一页逻辑
const handleNextPage = () => {
  if (props.currentPage < totalPages.value) {
    emits('page-change', props.currentPage + 1)
  }
}
// 处理页码点击逻辑
const handlePageClick = (page) => {
  emits('page-change', page)
}

</script>

<template>
  <div id="pagination">
    <ul class="page-list">
      <li class="material-icons page-btn page-btn-prev" :class="{ 'isClick': props.currentPage > 1 }" @click="handlePrevPage">
        <i class="bi bi-chevron-left"></i>
      </li>
      <li v-if="pageNumbers[0] > 1" class="page-number" @click="handlePageClick(1)">1</li>
      <li v-if="pageNumbers[0] > 2" class="material-icons page-dot page-dot-prev" @click="handlePageClick(pageNumbers[0] - 1)"></li>
      <li v-for="page in pageNumbers" :key="page" class="page-number" :class="{ 'active': page === props.currentPage }" @click="handlePageClick(page)">
        {{ page }}
      </li>
      <li v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="material-icons page-dot page-dot-next" @click="handlePageClick(pageNumbers[pageNumbers.length - 1] + 1)"></li>
      <li v-if="pageNumbers[pageNumbers.length - 1] < totalPages" class="page-number" @click="handlePageClick(totalPages)">{{ totalPages }}</li>
      <li class="material-icons page-btn page-btn-next" :class="{ 'isClick': props.currentPage < totalPages }" @click="handleNextPage">
        <i class="bi bi-chevron-right"></i>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
#pagination {
  width: 100%;
  
  .page-list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 30px 0;
    margin-bottom: 0;
    padding: 0;
    border-radius: 8px;
    // 使用背景颜色变量
    background-color: var(--theme-second-bg);
    // 使用阴影颜色变量
    box-shadow: 1px 2px 2px var(--theme-card-highlight);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 1px 4px 8px var(--theme-card-hover-shadow);
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        margin: 10px;
        border-radius: 5px;
        transition: all .3s;

        // 左右按钮
        &.page-btn {
          color: var(--color-text);
          font-size: 22px;

          &.isClick {
            color: var(--color-text);
            cursor: pointer;
            &:hover {
                // 使用文字悬停/激活颜色变量
                color: var(--color-text);
                // 使用主色调变量
                background-color: var(--theme-main-bg);
            }
          }
        }

        // 页码
        &.page-number {
          color: var(--color-text);
          cursor: pointer;
          &:hover {
              // 使用文字悬停/激活颜色变量
              color: var(--theme-accent-color);
              font-weight: bold;
              // 使用主色调变量
              background-color: var(--theme-main-bg);
          }
          // 选中状态
          &.active {
              // 使用文字悬停/激活颜色变量
              color: var(--theme-accent-color);
              font-weight: bold;
              // 使用主色调变量
              background-color: var(--theme-main-bg);
              cursor: default;
          }   
        }
        // 省略号
        &.page-dot {
          // 使用文字默认颜色变量
          color: var(--color-text);
          font-size: 18px;
          cursor: pointer;
          &:hover {
            // 使用主色调变量
            color: var(--theme-accent-color);
          }
          &::after {
            content: '···';
          }
          // 左边
          &.page-dot-prev:hover {
              &::after {
                // 使用 Bootstrap 的向左箭头图标
                content: '\F276';
                font-family: 'bootstrap-icons';
              }
          }
          // 右边
          &.page-dot-next:hover {
              &::after {
                // 使用 Bootstrap 的向右箭头图标
                content: '\F277';
                font-family: 'bootstrap-icons';
              }
          }
      }

    }
  }
}
</style>