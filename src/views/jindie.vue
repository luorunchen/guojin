<template>
  <div class="info">
    <h1>来料检验单</h1>
    <el-form :model="formInline" class="demo-form-inline" label-position="left" label-width="auto" size="small">
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="业务类型">
            <el-input v-model="formInline.FBizTypeName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商">
            <el-input v-model="formInline.FSupplyIDName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检验单号">
            <el-input v-model="formInline.FBillNo" disabled />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="源单类型">
            <el-input v-model="formInline.FSourceTranType" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选单号">
            <el-input v-model="formInline.FSelBillNo" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检验日期">
            <el-input v-model="formInline.Fdate" disabled />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="物料代码">
            <el-input v-model="formInline.FItemIDName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物料名称">
            <el-input v-model="formInline.FItemName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格型号">
            <el-input v-model="formInline.FItemModel" disabled />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="单位">
            <el-input v-model="formInline.FUnitIDName" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="8" :offset="8">
          <el-form-item label="销售订单号">
            <el-input v-model="formInline.user" disabled />
          </el-form-item>
        </el-col>

      </el-row>



    </el-form>

    <el-tabs type="border-card">
      <el-tab-pane label="检验信息">
        <el-form :model="formInline" label-position="left" label-width="auto" size="small">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="批号">
                <el-input v-model="formInline.FBatchNo" disabled />
              </el-form-item>
              <el-form-item label="报检数量">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
              <el-form-item label="样本破坏数">
                <el-input v-model="formInline.FAuxSampleBreakQty" disabled />
              </el-form-item>
              <el-form-item label="检验结果">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
              <el-form-item label="制单人">
                <el-input v-model="formInline.FBizTypeName" disabled />
              </el-form-item>
              <el-form-item label="审核人">
                <el-input v-model="formInline.FCheckerIDName" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="辅助属性">
                <el-input v-model="formInline.FAuxPropIDName" disabled />
              </el-form-item>
              <el-form-item label="检验数量">
                <el-input v-model="formInline.FAuxQCheckQty" disabled />
              </el-form-item>
              <el-form-item label="合格数量">
                <el-input v-model="formInline.FAuxQtyPass" disabled />
              </el-form-item>
              <el-form-item label="检验次数">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
              <el-form-item label="制单日期">
                <el-input v-model="formInline.Fdate" disabled />
              </el-form-item>
              <el-form-item label="审核日期">
                <el-input v-model="formInline.FCheckDate" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检验方式">
                <el-input v-model="formInline.FCheckMethodName" disabled />
              </el-form-item>
              <el-form-item label="质检方案">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
              <el-form-item label="不合格数量">
                <el-input v-model="formInline.FAuxNotPassQty" disabled />
              </el-form-item>
              <el-form-item label="送检员">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
              <el-form-item label="检验员">
                <el-input v-model="formInline.user" disabled />
              </el-form-item>
            </el-col>

          </el-row>



        </el-form>

      </el-tab-pane>
      <el-tab-pane label="抽样信息">抽样信息</el-tab-pane>
      <el-tab-pane label="其他信息"> <el-table :data="tableData" border show-summary style="width: 100%" size="small"
          height="200px" class="table">
          <el-table-column type="index" />
          <el-table-column prop="id" label="源单类型"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="源单编号"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="报检单号"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="报检单行号"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="订单号"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="订单行号"> <el-input></el-input></el-table-column>
          <el-table-column prop="name" label="报检数量"> <el-input></el-input></el-table-column>
        </el-table></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border show-summary style="width: 100%" size="small" class="table" height="250px">
      <el-table-column type="index" />
      <el-table-column prop="id" label="检验项目类别代码" width="120">
        <el-input></el-input>
      </el-table-column>
      <el-table-column prop="name" label="检验项目类别名称" width="120"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="检验项目代码"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="检验项目名称"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="分析方法"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="检验方法"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="默认检验依据" width="120"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="其他检验依据1" width="120">
        <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="其他检验依据2" width="120"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="单位"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="目标值"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="规格下限"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="规格上限"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="检验值"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="上公差"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="下公差"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="是否重点检查"> <el-input></el-input></el-table-column>
      <el-table-column prop="name" label="抽样标准(严重)" width="120"> <el-input></el-input></el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts" setup>
import { List } from '@/api/index.js'
import { onMounted, reactive } from 'vue'
import type { TableColumnCtx } from 'element-plus'

interface Product {

  name: string

}
const formInline = reactive({
  FBizTypeName: '',
  FSupplyIDName: '',
  FBillNo: "",
  FSourceTranType: "",
  Fdate: "",
  FSelBillNo: "",
  FItemIDName: "",
  FItemName: "",
  FItemModel: "",
  FUnitIDName: "",
  user: "",
  FBatchNo: "",
  FAuxSampleBreakQty: "",
  FBillerIDName: "",
  FAuxQtyPass: "",
  FCheckerIDName: "",
  FAuxQCheckQty: "",
  FCheckDate: "",
  FCheckMethodName: "",
  FAuxNotPassQty: "",
  FAuxPropIDName: ""
})
const tableData: Product[] = [
  {

    name: 'Tom',

  },
  {

    name: 'Tom',

  },
  {

    name: 'Tom',

  },
  {

    name: 'Tom',

  },
  {

    name: 'Tom',

  },

]
onMounted(() => {
  ListFun()
})
const ListFun = () => {
  List(1, 10, "").then(res => {
    for (let key in res.data.data[0]) {
      for (let label in formInline) {
        if (label == key) {
          formInline[label] = res.data.data[0][key];
        }
      }
    }
    res.data.data[0]
  })
}
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="less" scoped>
.info {
  background: #f1e9f1;
  padding: 30px;
  height: calc(100vh);
  text-align: center;
  box-sizing: border-box;
}

.demo-form-inline {
  margin-top: 50px;
}

/deep/.el-tabs {
  background: transparent;
  // border: nonde;
  padding: 0 20px;
  margin-bottom: 30px;
  box-shadow: 20px 10px 20px 0px #c0bebe;
}

/deep/.el-table th {
  background: rgb(198, 211, 231);
  color: #000;



}

/deep/.el-table tr {
  background: #f1e9f1;
}

.table {
  /deep/ .el-input__wrapper {
    background: #f1e9f1;
  }
}

/deep/.el-table__footer-wrapper tbody td.el-table__cell {
  background: rgb(255, 234, 140);
}

/deep/.el-scrollbar {
  background: #f1e9f1;
}

/deep/.el-table__cell {
  &:nth-child(1) {
    background: rgb(198, 211, 231)
  }

}
</style>