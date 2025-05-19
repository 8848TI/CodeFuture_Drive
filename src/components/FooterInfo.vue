<script setup>
// 定义当前年份，用于版权信息
const currentYear = new Date().getFullYear();
</script>

<template>
  <!-- 底部组件，固定在底部 -->
  <footer class="footer py-3 bg-light">
    <div class="container text-center">
      <!-- 联系我们部分 -->
      <div class="row mb-3">
        <div class="col">
          <h5>联系我们</h5>
          <p class="mb-1">邮箱: 3022926092@qq.com</p>
          <p class="mb-0">电话: +86 1234567890</p>
        </div>
      </div>
      <!-- 版权信息部分 -->
      <div class="row">
        <div class="col">
          <p class="text-muted mb-0">&copy; {{ currentYear }} 示例公司. 保留所有权利.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
html, body {
  height: 100%;
  min-width: 320px; /* 设置最小宽度，适配移动端 */
  margin: 0;
  padding: 0;
  overflow: hidden;

  footer {
    background-color: var(--theme-second-bg) !important;
    box-shadow: 0 -1px 6px rgba(0, 0, 0, .1);
  }

  .row {
    .col {
      color: var(--color-heading) !important;

      p.text-muted {
        color: var(--color-heading)!important;
      }
      
    }
  }
}
</style>