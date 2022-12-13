<template>
  <div>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border height="600px">
      <!-- <el-table-column prop="date" label="Date" sortable /> -->
      <el-table-column prop="name" label="类目" />
      <el-table-column prop="address" label="操作">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>


  </div>
</template>
<script lang="ts" setup>
import { getList } from '@/api/index.js'
import { onMounted, ref } from 'vue'
interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}
const tableData: User[] = ref([

])
onMounted(() => {
  getList(1).then(res => {
    tableData.value = res.data.data[0].children
    console.log(tableData.value, 987);

  })
})
const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
  }, 1000)
}




</script>
