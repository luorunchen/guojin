<template>
  <el-table :data="tableData" stripe style="width: 100%;margin-bottom: 50px;" height="50vh">
    <el-table-column type="index" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="address" label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>

      </template>
    </el-table-column>
  </el-table>
  <Pagination :total="total" @changeList="changeList" />
  <SeeFlie ref="seeFile"> </SeeFlie>
</template>

<script lang="ts" setup>
import { select } from '@/api/index.js'
import { onMounted, ref } from 'vue'
import Pagination from "../pagination/index.vue";
import SeeFlie from "../seeFlie/index.vue";

const props = defineProps({
  tid: String
})


const currentPage4 = ref(1);
const pageSize4 = ref(10);
const seeFile = ref(null);
const tableData = ref([])
const total = ref(0)

onMounted(() => {
  selectFun()
})

const see = (row) => {
  seeFile.value.show(row, "law");
}

const selectFun = () => {
  select(props.tid, currentPage4.value, pageSize4.value).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  // console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;

  selectFun()

};
</script>
