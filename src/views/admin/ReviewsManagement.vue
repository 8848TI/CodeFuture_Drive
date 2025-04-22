<script setup>
import { Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const tableData = [
  { title: '评论内容1', category: '评价人1', author: '博客标题1', date: '2024-09-01' },
  { title: '评论内容2', category: '评价人2', author: '博客标题2', date: '2024-09-02' },
]
const currentPage2 = ref(1) // 当前页码
const pageSize2 = ref(10) // 每页显示的数量


</script>

<template>
  <div id="reviews-management">
    <el-container title="评价管理">
      <!-- 评价管理的内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="评论内容" width="300" />
        <el-table-column prop="category" label="评价人" width="180" />
        <el-table-column prop="author" label="博客标题" />
        <el-table-column prop="date" label="评价日期" />
        <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
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
#reviews-management {
}
</style>