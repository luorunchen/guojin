<template>
  <el-drawer v-model="table" title="待审核文件" direction="rtl" size="100%">
    <el-table :data="gridData">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="create_name" label="审核类型">
        <template #default="scope">
          {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
          <el-button size="small" type="success" @click="auditFile('yes', scope.row)">通过</el-button>
          <el-button size="small" type="danger" @click="auditFile('no', scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total2" :type="2" @changeList="changeList" />
  </el-drawer>
  <SeeFlie ref="seeFile"></SeeFlie>
</template>

<script lang="ts" setup>
import { auditContent, getAuditFiles } from '@/api/index'
import { ref, defineExpose } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '../pagination/index.vue'
import SeeFlie from '../seeFlie/index.vue'
const table = ref(false)
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const gridData = ref([])
const total2 = ref(0)
const seeFile: any = ref(null)
//审核文件
const auditFile = (status: string, row: any) => {
  ElMessageBox.confirm(
    `是否确定${status == 'yes' ? '通过' : '驳回'}<span style='color:red'>${row.title
    }</span>文件?`,
    '审核文件',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    auditContent(
      status == 'yes' ? 1 : 2, //1是通过,2是驳回
      row.id
    ).then((res) => {
      if (res.data.code == 200) {
        if (status == 'yes') {
          ElMessage({
            showClose: true,
            message: '审核通过',
            type: 'success',
          })
          // fileInfoFun()
          // getAuditFilesFun()
        } else {
          ElMessage({
            showClose: true,
            message: '文件已驳回',
            type: 'warning',
          })
          // getAuditFilesFun()
        }
      }
    })
  })
}
//获取审核文件
const getAuditFilesFun = () => {
  getAuditFiles(currentPage3.value, pageSize3.value).then((res) => {
    gridData.value = res.data.data
    total2.value = res.data.dataCount
  })
}
//查看文件
const see = (row: any) => {
  seeFile.value.show(row)
}
const show = () => {
  table.value = true
  getAuditFilesFun()
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, '收到啦分液器', type)

  pageSize3.value = pageSize
  currentPage3.value = currentPage
  getAuditFilesFun()
}
defineExpose({
  show,
})
</script>

<style>

</style>