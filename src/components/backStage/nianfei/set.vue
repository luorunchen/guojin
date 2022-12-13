<template>

  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="年费名称:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item orm-item label="所属分类:">

        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option :label="item.name" :value="item.id" v-for="item, index in industryList" :key="index" />

        </el-select>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCompanyListFun('select')">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="gridData" height="550px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="company" label="套餐名称" />
      <el-table-column prop="name" label="所属分类" />
      <el-table-column prop="i" label="套餐金额" />
      <el-table-column prop="o" label="套餐年限" />
      <!-- <el-table-column prop="create_name" label="审核类型">
        <template #default="scope">
          {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="drawerOpen(scope.row)">详情</el-button>
          <el-button size="small" type="primary" @click="drawerOpen(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>



    <el-drawer v-model="drawer" size="80%" :title="drawerTitle">

      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">

        <!-- <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
      </el-tabs>

    </el-drawer>
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>


</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Pagination from "../../pagination/index.vue"
import SeeFlie from "../../seeFlie/index.vue"
import { getCompanyList, getHY, getCompanyStandInfo, getCompanyInfoById } from '@/api/index'
import { tableV2RowProps, TabsPaneContext } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const formInline = reactive({
  user: '',
  region: ""
})
const ruleForm = reactive({
  name: 'Hello',
  resource: [],
  industry: ""
})
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const gridData = ref([{
  company: '1年餐',
  name: '企业',
  i: '800元',
  o: '1年',
}])
const seeFile = ref(null)
const industryList = ref([])
const total = ref(0)
const tables = ref([])
const companyId = ref()
const drawer = ref(false)
const activeName = ref('first')
const drawerTitle = ref('')




onMounted(() => {
  getCompanyListFun("")
  getHYFun()
})
//企业列表
const getCompanyListFun = (select: string) => {
  getCompanyList(formInline.user, formInline.region, currentPage3.value, pageSize3.value).then(res => {

    if (!(res.data.code == 200 && res.data.dataCount > 0)) {
      if (select != "") {
        ElMessage({
          message: '暂无查询数据',
          type: 'error',
          showClose: true
        })
      }

    }
    total.value = res.data.dataCount
    // gridData.value = res.data.data
  })
}
//行业列表
const getHYFun = () => {
  getHY().then(res => {
    industryList.value = res.data.data
  })
}
//查看文件
const see = (row: any) => {
  seeFile.value.show(row)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab)
  if (tab.props.name == 'first') {
    getCompanyInfoByIdFun()
  } else {
    getCompanyStandInfo(companyId.value, "", "", "", 2, currentPage3.value, pageSize3.value).then(res => {
      tables.value = res.data.data
      total.value = res.data.dataCount
    })
  }

}
//企业详情
const getCompanyInfoByIdFun = () => {
  getCompanyInfoById(companyId.value).then(res => {

  })
}
const drawerOpen = (row) => {
  drawer.value = true
  drawerTitle.value = row.company
  companyId.value = row.companyId
  getCompanyInfoByIdFun()
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, '收到啦分液器', type)

  pageSize3.value = pageSize
  currentPage3.value = currentPage
  // getAuditFilesFun()
  getCompanyListFun("")
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
  height: 640px;
  background: #FFFFFF;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}

/deep/.el-drawer.rtl {

  height: 88%;
  top: 100px;
  bottom: 0;
  /* right: 28px; */
  left: 350px;
  /* right: 0; */
  // text-align: center;
  margin-bottom: 0;

  // font-size: 30px;
  // position: fixed;
  .el-drawer__title {
    font-size: 25px;
    color: #000;
  }

  .info {
    padding: 30px;
  }

  .el-form-item {
    width: 46%;
  }
}
</style>