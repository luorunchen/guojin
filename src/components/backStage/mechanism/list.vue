<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="box">
        <p>行政区域</p>
        <el-tree :props="props" :load="loadNode" lazy highlight-current @node-click="treeChange" />
        <!-- <el-tree
          :data="databasesList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          highlight-current
        /> -->
      </div>
    </el-col>
    <el-col :span="19">
      <div class="top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="机构名称:">
            <el-input v-model="formInline.user" placeholder="请输入" />
          </el-form-item>
          <el-form-item orm-item label="机构服务类型:">
            <el-select v-model="formInline.region" clearable placeholder="请选择">
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in industryList" :key="index" />
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
          <FilingInformationTwo :status="status" :seeRowId="companyId" />
        </el-drawer>
        <SeeFlie ref="seeFile"></SeeFlie>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Pagination from "../../pagination/index.vue";
import SeeFlie from "../../seeFlie/index.vue";
import FilingInformationTwo from "@/components/filingInformation/two.vue";
import {
  getInstitutionsList,
  getInsType,
  getCompanyStandInfo,
  getCompanyInfoById,
  getRegionCode,
} from "@/api/index";
import { tableV2RowProps, TabsPaneContext } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";

interface Tree {
  name: string;
  leaf?: boolean;
}
const props = {
  label: "ad_Region",
  id: "ad_Code",
};
const formInline = reactive({
  user: "",
  region: "",
  code: "",
});
const ruleForm = reactive({
  name: "Hello",
  resource: [],
  industry: "",
});
const currentPage3 = ref(1);
const pageSize3 = ref(10);
const gridData = ref([]);
const status = ref();
const seeFile = ref(null);
const industryList = ref([]);
const total = ref(0);
const tables = ref([]);
const codeList = ref([]);
const companyId = ref();
const drawer = ref(false);
const activeName = ref("first");
const drawerTitle = ref("");

onMounted(() => {
  getCompanyListFun("");
  getHYFun();
});

//获取行政区域
const getRegionCodeFun = (code, resolve) => {
  getRegionCode(code).then((result) => {
    return resolve(result.data.data);
  });
};
const treeChange = (node) => {
  formInline.code = node.ad_Code;
  getCompanyListFun("");
};
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  console.log(node);

  if (node.level === 0) {
    getRegionCodeFun("", resolve);
  }
  if (node.level >= 1) {
    getRegionCodeFun(node.data.ad_Code, resolve);
  }
};
//企业列表
const getCompanyListFun = (select: string) => {
  getInstitutionsList(
    formInline.user,
    formInline.region,
    currentPage3.value,
    pageSize3.value,
    formInline.code
  ).then((res) => {
    if (!(res.data.code == 200 && res.data.dataCount > 0)) {
      if (select != "") {
        ElMessage({
          message: "暂无查询数据",
          type: "error",
          showClose: true,
        });
      }
    }
    total.value = res.data.dataCount;
    gridData.value = res.data.data;
  });
};
//行业列表
const getHYFun = () => {
  getInsType().then((res) => {
    industryList.value = res.data.data;
  });
};
//查看文件
const see = (row: any) => {
  seeFile.value.show(row, "law");
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab)
  if (tab.props.name == "first") {
    getCompanyInfoByIdFun();
  } else {
    getCompanyStandInfo(
      companyId.value,
      "",
      "",
      "",
      2,
      currentPage3.value,
      pageSize3.value
    ).then((res) => {
      tables.value = res.data.data;
      total.value = res.data.dataCount;
    });
  }
};
//企业详情
const getCompanyInfoByIdFun = () => {
  getCompanyInfoById(companyId.value).then((res) => { });
};
const drawerOpen = (row) => {
  drawer.value = true;
  drawerTitle.value = row.company;
  companyId.value = row.companyId;
  status.value = row.companyId;
  getCompanyInfoByIdFun();
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
  getCompanyListFun("");
};
</script>

<style lang="less" scoped>
.top {
  // width: 1560px;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;
}

.table {
  margin-top: 10px;
  padding: 20px;
  // width: 1560px;
  height: 640px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}

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