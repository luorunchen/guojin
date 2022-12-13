<template>

  <!-- <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="文件名称">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="所属行业">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div> -->
  <div class="table">
    <el-table :data="gridData" height="650px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人员" />
      <!-- <el-table-column prop="name" label="版块" /> -->
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
    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>


</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Pagination from "../../pagination/index.vue"
import SeeFlie from "../../seeFlie/index.vue"
import { auditContentManage, getAuditFilesManage } from '@/api/index'

import { ElMessage, ElMessageBox } from 'element-plus'
const formInline = reactive({
  user: '',
  region: ""
})
const table = ref(false)
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const gridData = ref([])
const total = ref(0)
const seeFile: any = ref(null)


onMounted(() => {
  getAuditFilesFun()
})

//审核文件
const auditFile = (status: string, row: any) => {
  if (status == 'yes') {
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
      auditContentManage(
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
            getAuditFilesFun()
          } else {
            ElMessage({
              showClose: true,
              message: '文件已驳回',
              type: 'warning',
            })
            getAuditFilesFun()
          }
        }
      })
    })
  } else {
    ElMessageBox.prompt(`是否确定${status == 'yes' ? '通过' : '驳回'}<span style='color:red'>${row.title
      }</span>文件?<br/>请填写驳回原因:`,
      '审核文件', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,

      // inputErrorMessage: 'Invalid Email',
    })
      .then(({ value }) => {
        auditContentManage(
          status == 'yes' ? 1 : 2, //1是通过,2是驳回
          row.id,
          value
        ).then((res) => {
          if (res.data.code == 200) {
            if (status == 'yes') {
              ElMessage({
                showClose: true,
                message: '审核通过',
                type: 'success',
              })
              // fileInfoFun()
              getAuditFilesFun()
            } else {
              ElMessage({
                showClose: true,
                message: '文件已驳回',
                type: 'warning',
              })
              getAuditFilesFun()
            }
          }
        })
      })

  }

}
//获取审核文件
const getAuditFilesFun = () => {
  getAuditFilesManage(currentPage3.value, pageSize3.value).then((res) => {
    gridData.value = res.data.data
    total.value = res.data.dataCount
  })
}
//查看文件
const see = (row: any) => {
  seeFile.value.show(row)
}

//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, '收到啦分液器', type)

  pageSize3.value = pageSize
  currentPage3.value = currentPage
  getAuditFilesFun()
}
</script>

<style lang="less" scoped>
.top {
  width: 1560px;
  height: 75px;
  background: #FFFFFF;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;
}

.table {
  margin-top: 10px;
  padding: 20px;
  width: 1560px;
  height: 740px;
  background: #FFFFFF;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}
</style>