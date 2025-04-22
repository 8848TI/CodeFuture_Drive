<script setup>
import { View, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const tableData = [
  {
    title: 'git基础指南',
    category: 'git',
    author: '张三',
    date: '2023-05-01'
  },
  {
    title: 'vue基础指南',
    category: 'vue',
    author: '李四',
    date: '2023-05-02' 
  }
]
const currentPage2 = ref(1) // 当前页码
const pageSize2 = ref(10) // 每页显示的数量
</script>

<template>
  <div id="blog-management">
    <el-container title="博客管理">
      <!-- 评价管理的内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="博客标题" width="180" />
        <el-table-column prop="category" label="博客类别" width="180" />
        <el-table-column prop="author" label="作者" />
        <el-table-column prop="date" label="发布日期" />
        <el-table-column label="菜单管理" width="150">
        <template #default="{ row, $index }">
          <el-button
            :icon="View"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      </el-table>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
      <!-- 分页功能 -->
      <!-- <el-pagination
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2"
        :page-sizes="[2, 5, 10, 20]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
        style="margin-top: 20px; justify-content: flex-end"
      /> -->
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>