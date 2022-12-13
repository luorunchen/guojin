<template>

  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item orm-item label="所属行业:">

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
      <el-table-column prop="company" label="公司名称" />
      <el-table-column prop="name" label="所属行业" />
      <el-table-column prop="address" label="地址" />
      <!-- <el-table-column prop="create_name" label="审核类型">
        <template #default="scope">
          {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="drawerOpen(scope.row)">详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>



    <el-drawer v-model="drawer" size="80%" :title="drawerTitle">

      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="备案信息" name="first">
          <div class="info">
            <!-- --------------------- -->
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="市场监督管理注册信息" name="first">
                <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm"
                  label-width="100px">
                  <el-form-item label="企业名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="企业名称" disabled>

                    </el-input>
                  </el-form-item>
                  <el-form-item label="法定代表人">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="注册资本">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="成立日期">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="营业期限">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="社会信用代码">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="注册地址">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>
                  <el-form-item label="经营范围">
                    <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
                  </el-form-item>

                </el-form>
              </el-tab-pane>
            </el-tabs>
            <!-- 其他信息 -->
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="其他信息" name="first">
                <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm"
                  label-width="100px">
                  <el-form-item label="上年产值" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="上年产值" disabled />
                  </el-form-item>
                  <el-form-item label="员工人数">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>

                  <el-form-item label="占地面积">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="经营面积">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="所属行业" prop="industry">
                    <!-- <el-cascader :props="props" v-model="ruleForm.industry" /> -->
                    <el-input v-model="ruleForm.industry" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="安全投入">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="评定标准">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="企业规模">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="主要产品">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>

                </el-form>

              </el-tab-pane>

            </el-tabs>
            <!-- 相关人员联系方式 -->
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="相关人员联系方式" name="first">
                <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="100px"
                  label-position="left">
                  <el-form-item label="主要负责人" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="安全生产管理人员" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="消防生产管理人员" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="电工" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>
                  <el-form-item label="设备管理人员" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入" disabled />
                  </el-form-item>


                </el-form>

              </el-tab-pane>

            </el-tabs>
            <!-- 本单位涉及的场所(可多选) -->
            <el-tabs v-model="activeName" class="demo-tabs1" @tab-click="handleClick">
              <el-tab-pane label="本单位涉及的场所(可多选)" name="first">
                <el-form class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="100px">
                  <el-form-item :label="item.name" prop="resource" v-for="item, index in formTreeList" :key="index">

                    <el-checkbox-group v-model="ruleForm.resource" v-for="item2, index2 in item.children" :key="index2">

                      <el-checkbox :label="item2.id">{{ item2.name }}</el-checkbox>

                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="自行建立专用设备设施" prop="resource" label-width="130px">
                    <el-input disabled></el-input>
                  </el-form-item>
                </el-form>

              </el-tab-pane>

            </el-tabs>
            <!-- --------------------- -->
          </div>

        </el-tab-pane>
        <el-tab-pane label="台账" name="second">
          <el-table :data="tables" height="450px">
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="create_date" label="上传时间" />
            <el-table-column prop="create_name" label="上传人员" />
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
                <!-- <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
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
import { getInstitutionsList, getHY, getCompanyStandInfo, getCompanyInfoById } from '@/api/index'
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
const gridData = ref([])
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
  getInstitutionsList(formInline.user, formInline.region, currentPage3.value, pageSize3.value).then(res => {

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
    gridData.value = res.data.data
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