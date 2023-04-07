<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">绑定企业</el-button>
    <br />
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom: 50px;" height="400px">
      <el-table-column type="index" />
      <el-table-column prop="company" label="公司名称" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="legal_person" label="法定代表人" />

    </el-table>
    <Pagination :total="total" :type="1" @changeList="changeList" />
  </div>
  <el-dialog v-model="dialogVisible" title="绑定企业" width="30%">
    企业名称:<el-input v-model="qiyeInput" placeholder="请输入要绑定的公司名称"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="inputTrue">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import Pagination from "../pagination/index.vue";
import { viewCompanyList, InstgetCompanyList, addInst_comp } from '@/api/index.js'
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus";
const tableData = ref([])
const total = ref(0)
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const dialogVisible = ref(false)
const qiyeInput = ref()
onMounted(() => {
  viewCompanyListFun()
})


const viewCompanyListFun = () => {
  viewCompanyList(currentPage4.value, pageSize4.value).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
}
const inputTrue = () => {
  InstgetCompanyList(qiyeInput.value).then(res => {
    if (res.data.code == 200 && res.data.data == null) {
      ElMessage({
        showClose: true,
        message: '查无该企业信息',
        type: 'error'
      })
    }
    else if (res.data.code == 200 && res.data.data.exit == 1) {
      ElMessage({
        showClose: true,
        message: '该企业已绑定',
        type: 'error'
      })
    } else {
      addInst_comp(res.data.data.companyId).then(result => {
        if (result.data.code == 200) {
          ElMessage({
            showClose: true,
            message: '绑定成功',
            type: 'success'
          })
          dialogVisible.value = false
          viewCompanyListFun()
        }
      })

    }
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
};
</script>

<style></style>