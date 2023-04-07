<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="box">
        <p>类目表</p>
        <el-tree :data="databasesList" :props="defaultProps" @node-click="handleNodeClick" highlight-current accordion />
      </div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.user" placeholder="请输入" />
        </el-form-item>
        <!-- <el-form-item label="企业选择">
        <el-select v-model="regionCompChange" class="m-2" placeholder="Select">
          <el-option v-for="item in getRegionCompList" :key="item.value" :label="item.company"
            :value="item.companyId" />
        </el-select>
      </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="infoFun">查询</el-button>
          <!-- <el-button type="primary" @click="uploadFun">上传</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%;margin-bottom:50px" height="600px">
        <el-table-column type="index" width="50" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="create_date" label="上传时间" />
        <el-table-column prop="create_name" label="上传人员" />
        <!-- <el-table-column prop="name" label="版块" /> -->
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>

          </template>
        </el-table-column>
      </el-table>
      <SeeFlie ref="seeFile"></SeeFlie>
      <Pagination :total="total" :type="1" @changeList="changeList" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { governmentGetCompanyStandInfo, getStandList } from '@/api/index.js'
import { onMounted, reactive, ref } from 'vue'
import Pagination from "../pagination/index.vue";
import SeeFlie from "../seeFlie/index.vue";
const tableData = ref()
const total = ref(0)
const seeFile = ref(null)
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const databasesList: Tree[] = ref([]);
const formInline = reactive({
  user: "",
  tid: ''
})
const props = defineProps({
  companyId: String
})
const defaultProps = {
  children: "children",
  label: "name",
};
onMounted(() => {
  infoFun()
  getStandList().then((res) => {
    console.log([res.data.data[0].children[0], res.data.data[0].children[1]]);

    databasesList.value = [
      res.data.data[0].children[0],
      res.data.data[0].children[1],
    ];
  });
})
const handleNodeClick = (data: Tree) => {
  formInline.tid = data.id;
  infoFun()
}
const see = (row: any) => {
  seeFile.value.show(row, "law");
};
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
};
const infoFun = () => {
  governmentGetCompanyStandInfo(
    props.companyId,
    formInline.user,
    3,
    formInline.tid,
    currentPage4.value,
    pageSize4.value
  ).then(res => {

    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
}
</script>

<style lang="less" scoped>
.box {
  margin-top: 10px;
  width: 100%;
  height: 725px;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  overflow: auto;

  p {
    background: #dcefff;
    padding: 10px;
    font-size: 16px;
    font-weight: 900;
  }

  /deep/.el-tree-node__label {
    font-size: 16px;
    // font-weight: 600;
    display: inline-block;
    margin: 2px 0;
    // color: #fff;
  }

  /deep/.el-tree {
    background: transparent;

    // .el-tree-node__content:hover {
    //   background: none;
    // }
  }

  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    // 设置颜色
    background-color: rgba(135,
        206,
        235,
        0.2); // 透明度为0.2的skyblue，作者比较喜欢的颜色
    color: #0165d0ff; // 节点的字体颜色
    font-weight: bold; // 字体加粗
  }
}
</style>