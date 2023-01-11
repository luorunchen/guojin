<template>
  <div id="account" ref="account">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="企业选择">
        <el-select v-model="regionCompChange" class="m-2" placeholder="Select">
          <el-option
            v-for="item in getRegionCompList"
            :key="item.value"
            :label="item.company"
            :value="item.companyId"
          />
        </el-select>
      </el-form-item>
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
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="company" label="对应企业" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)"
            >查看</el-button
          >

          <el-button
            size="small"
            type="danger"
            @click="delFileInfoFun(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" :type="1" @changeList="changeList" />
    <Upload ref="upload" :status="status" :labelName="labelName" :ftp="'2'" />
    <SeeFlie ref="seeFile" />
  </div>
</template>

<script script lang = "ts" setup >
import { getInstBankInfo, delStandFileInfo, getRegionComp } from "@/api/index";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import SeeFlie from "../seeFlie/index.vue";
import Upload from "../upload/index.vue";
import Pagination from "../pagination/index.vue";

import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const currentPage4 = ref(1);
const pageSize4 = ref(10);

const total = ref(0);
const input2 = ref("");
const account = ref(null);

const status = ref("mechanism");
const table = ref(false);
const regionCompChange = ref("");
const getRegionCompList = ref([]);
const labelName = ref([
  {
    parent_id: "",
  },
]);
const formInline = reactive({
  user: "",
  region: "",
});
const seeFile: any = ref(null);
const upload: any = ref(null);

const tableData = ref([
  {
    id: 44,
    tid: 12,
    title: "生产安全事故应急条例",
    url: "http://119.91.156.5/download/b390071e-f679-4e00-a8a1-75ade57e79fe生产安全事故应急条例.docx",
    level: 1,
    status: null,
    create_date: "2022-11-22 07:51:46",
    create_name: "admin",
    update_date: null,
    update_name: null,
  },
]);

const props = defineProps({
  tid: Number,
  boxHeight: Number,
});
watch(
  () => props.tid,
  (val) => {
    console.log(val, "props");
    fileInfoFun();
  }
);
watch(
  () => props.boxHeight,
  (val) => {
    console.log(val, "123");
    account.value.style.height = val + "px";
    // console.log(law.value.clientHeight);
    // fileInfoFun();
  }
);

onMounted(() => {
  fileInfoFun();
  getRegionCompFun();
});
//下载模板
const downloadFileFun = (url: string) => {
  window.open(url);
};

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否删除<span style='color:red'> ${row.title} </span>文件?`,
    "删除文件",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delStandFileInfo(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        fileInfoFun();
      } else {
        ElMessage({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }
    });
  });
};
//查看文件
const see = (row: any) => {
  seeFile.value.show(row);
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  fileInfoFun();
};
const uploadFun = () => {
  console.log(321);

  upload.value.show();
};
const onSubmit = () => {
  console.log("submit!");
};
//获取列表
const fileInfoFun = () => {
  getInstBankInfo(
    sessionStorage.getItem("tid"),
    input2.value,
    "",
    currentPage4.value,
    pageSize4.value
  )
    .then((res: any) => {
      // console.log(res, 99)
      tableData.value = res.data.data;
      total.value = res.data.dataCount;
    })
    .catch((err) => {
      console.log(err, 555);
    });
};
const getRegionCompFun = () => {
  getRegionComp().then((res) => {
    getRegionCompList.value = res.data.data;
  });
};
</script>

<style scoped lang="less">
// .demo-pagination-block {
//   position: absolute;
//   bottom: 10px;
//   right: 50px;
// }
#account {
  height: 500px;
}
</style>
