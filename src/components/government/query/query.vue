<template>
  <div id="account" ref="account">
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="uploadFun">上传</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9">
        <el-select v-model="regionCompChange" class="m-2" placeholder="Select">
          <el-option
            v-for="item in getRegionCompList"
            :key="item.value"
            :label="item.company"
            :value="item.companyId"
          />
        </el-select>
        <el-button type="primary" @click="uploadFun">上传文件</el-button>


      </el-col>
    </el-row> -->
    <!-- <br /> -->
    <el-table :data="tableData" stripe style="width: 100%" height="89%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="company" label="公司名称" />
      <el-table-column prop="name" label="所属行业" />
      <el-table-column prop="address" label="公司地址" />

      <!-- <el-table-column prop="create_name" label="上传人员" / -->
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="备案表" width="70%">
      <FilingInformationOne
        :status="'government'"
        :seeRowId="seeRowId"
        v-if="store.state.menuName == '企业备案查询'"
      />
      <FilingInformationTwo
        :status="'government'"
        :seeRowId="seeRowId"
        v-if="store.state.menuName == '机构备案查询'"
      />
    </el-dialog>

    <Pagination :total="total" :type="1" @changeList="changeList" />
  </div>
</template>

<script script lang = "ts" setup >
import { getCompList, getInstList } from "@/api/index";
import { onMounted, reactive, ref, defineProps, watch } from "vue";

import Pagination from "../../pagination/index.vue";
import FilingInformationOne from "@/components/filingInformation/one.vue";
import FilingInformationTwo from "@/components/filingInformation/two.vue";
import { ElMessage, ElMessageBox } from "element-plus";

import { useStore } from "vuex";
const store = useStore();
const currentPage4 = ref(1);
const pageSize4 = ref(10);

const total = ref(0);

const dialogVisible = ref(false);
const account = ref(null);

const seeRowId = ref("");

const formInline = reactive({
  user: "",
  region: "",
});

const tableData = ref([]);

const see = (row) => {
  dialogVisible.value = true;
  seeRowId.value = row.companyId;

  // switch (val) {
  //   case "企业备案查询":
  //     getCompListFun();
  //     break;
  //   case "机构备案查询":
  //     getInstListFun();
  //     break;
  // }
};
const props = defineProps({
  boxHeight: Number,
});

watch(
  () => props.boxHeight,
  (val) => {
    console.log(val, "123");
    account.value.style.height = val + "px";
    // console.log(law.value.clientHeight);
    // fileInfoFun();
  }
);

watch(
  () => store.state.menuName,
  (val) => {
    toggleMenu(val);
  }
);
onMounted(() => {
  toggleMenu(store.state.menuName);
});

const toggleMenu = (val) => {
  switch (val) {
    case "企业备案查询":
      getCompListFun();
      break;
    case "企业台账查询":
      getCompListFun();
      break;
    case "企业现场查询":
      getCompListFun();
      break;
    case "机构备案查询":
      getInstListFun();
      break;
  }
};
const getCompListFun = () => {
  getCompList("", "", 1, 10).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.dataCount;
  });
};
const getInstListFun = () => {
  getInstList("", "", 1, 10).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.dataCount;
  });
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
};
</script>

<style scoped lang="less">
// .demo-pagination-block {
//   position: absolute;
//   bottom: 10px;
//   right: 50px;
// }
</style>
