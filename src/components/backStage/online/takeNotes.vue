<template>
  <div id="take">
    <el-table :data="tableData" stripe style="width: 100%" height="75vh">
      <el-table-column type="index" />
      <el-table-column prop="username" label="咨询方" />
      <el-table-column prop="servicename" label="专家/客服" />
      <el-table-column prop="appraise" label="评分" />
      <el-table-column prop="endTime" label="结束时间" />
      <el-table-column prop="content" label="留言" />
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
  </div>
</template>

<script lang="ts" setup>
import { selectChatLog } from '@/api/index.js'
import Pagination from "../../pagination/index.vue";
import { onMounted, ref } from 'vue'
const total = ref(0)
const pageSize3 = ref(10)
const currentPage3 = ref(1)
const tableData = ref([])

onMounted(() => {
  selectChatLogFun()
})
const selectChatLogFun = () => {
  selectChatLog("", "", currentPage3.value, pageSize3.value).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
  // getWxAuditFun("");
  selectChatLogFun()
};
</script>
<style scoped lang="less">
#take {
  height: 80vh;
  background: #fff;
  position: relative;
}
</style>
