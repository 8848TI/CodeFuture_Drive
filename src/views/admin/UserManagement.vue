<script setup>
import { CloseBold } from '@element-plus/icons-vue'

const tableData = [
  { account: '123456', username: '张三', date: '2024-05-01' },
  { account: '654321', username: '李四', date: '2024-05-02' },
]

</script>

<template>
  <div id="user-management">
    <el-container title="用户管理">
      <!-- 评价管理的内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account" label="用户账号" width="300" />
        <el-table-column prop="username" label="用户名" width="380" />
        <el-table-column prop="date" label="注册日期" />
        <el-table-column label="冻结账户" width="200">
        <template #default="{ row, $index }">
          <el-button
            circle
            plain
            type="danger"
            :icon="CloseBold"
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