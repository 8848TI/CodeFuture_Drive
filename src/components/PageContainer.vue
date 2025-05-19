<script setup>
defineProps({
  title: {
    require: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- <el-button type="primary"> -->
          <slot name="extra"></slot>
          <!-- </el-button> -->
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style scoped lang="scss">
.page-container {
  box-sizing: border-box;
  border-radius: 15px;
  background: var(--theme-second-bg);
  border: 1px solid var(--theme-main-bg);
  color: var(--color-heading);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
