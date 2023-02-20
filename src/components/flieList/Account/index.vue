<template>
  <div id="account" ref="account">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9">
        <el-button type="primary" @click="uploadFun">上传文件</el-button>
        <el-button type="primary" @click="syncLaw"
          >同步资料库文件到台账</el-button
        >
        <!-- <el-button type="primary" @click="uploadFun"
          >同步资料库文件到台账</el-button
        > -->
        <!-- <el-button type="primary" @click="getAuditFilesFun">待审核文件</el-button> -->
      </el-col>
      <el-col :span="7">
        <el-radio-group v-model="style" size="default">
          <el-radio-button label="1">公共模板</el-radio-button>
          <el-radio-button label="2">我的台账</el-radio-button>
        </el-radio-group>

        <!-- <el-select
          v-model="style"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option label="模板" value="1" />
          <el-option label="台账" value="2" />
        </el-select> -->
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData" stripe style="width: 100%" height="89%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)"
            >查看</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="downloadFileFun(scope.row.url)"
            v-if="style == '1'"
            >下载模板
          </el-button>
          <el-button
            v-if="style == '1'"
            size="small"
            type="success"
            @click="onlineEditing(scope.row)"
            >在线编辑</el-button
          >
          <el-button
            v-if="style == '1'"
            size="small"
            type="success"
            @click="generate(scope.row)"
            >生成台账</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delFileInfoFun(scope.row)"
            v-if="style == '2'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="同步资料库文件">
      <el-button type="primary" @click="syncDataBaseBankFun"
        >确定同步</el-button
      >
      <el-divider />
      <el-table :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column property="title" label="标题" />
        <el-table-column property="name" label="板块" />
      </el-table>
    </el-dialog>
    <AuditFile ref="auditFile" />

    <Pagination :total="total" :type="1" @changeList="changeList" />
    <Upload ref="upload" :status="status" :labelName="labelName" :ftp="1" />
    <SeeFlie ref="seeFile" />
  </div>
</template>

<script script lang = "ts" setup >
import {
  getStandInfo,
  delStandFileInfo,
  editMb,
  getDataBaseBank,
  syncDataBaseBank,
} from "@/api/index";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import SeeFlie from "../../seeFlie/index.vue";
import Upload from "../../upload/index.vue";
import Pagination from "../../pagination/index.vue";
import AuditFile from "../../auditFile/index.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const currentPage3 = ref(1);
const pageSize3 = ref(10);
const total = ref(0);
const input2 = ref();
const account = ref(null);
const total2 = ref(0);
const status = ref("Account");
const table = ref(false);
const dialogTableVisible = ref(false);
//公共台账和我的模板切换
const style = ref("1");
const gridData = ref([]);
const multipleSelection = ref([]);
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
const auditFile: any = ref(null);
const tableData = ref([]);

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
watch(
  () => style.value,
  (value) => {
    console.log(value);

    fileInfoFun();
  }
);
onMounted(() => {
  fileInfoFun();
});
//下载模板
const downloadFileFun = (url: string) => {
  window.open(url);
};
const syncLaw = () => {
  dialogTableVisible.value = true;
  getDataBaseBank(props.tid, 1, 1000).then((res) => {
    gridData.value = res.data.data;
  });
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
const syncDataBaseBankFun = () => {
  let arr = [];
  multipleSelection.value.forEach((element) => {
    arr.push(element.id);
  });
  syncDataBaseBank(
    props.tid,
    sessionStorage.getItem("evaluation"),
    arr.toString()
  ).then((res) => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: "台账生成成功",
        type: "success",
      });
      dialogTableVisible.value = false;
      getDataBaseBank(props.tid, 1, 1000).then((res) => {
        gridData.value = res.data.data;
      });
    } else {
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: "error",
      });
    }
  });
};
//在线编辑
const onlineEditing = (row: any) => {
  console.log(row);
  seeFile.value.show(row, "account");
};
//获取待审核文件列表
const getAuditFilesFun = () => {
  auditFile.value.show();
  console.log(123);
};

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否删除<span style='color:red'> ${row.title} </span>文件?`,
    "删除文件",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
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
//查看文件+
const see = (row: any) => {
  seeFile.value.show(row, style.value == "1" ? "law" : "see");
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  fileInfoFun();
};
const uploadFun = () => {
  upload.value.show();
};
const onSubmit = () => {
  console.log("submit!");
};
//获取列表
const fileInfoFun = () => {
  getStandInfo(
    sessionStorage.getItem("tid"),
    currentPage4.value,
    pageSize4.value,
    style.value,
    sessionStorage.getItem("evaluation"),
    input2.value
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
//生产台账
const generate = (row) => {
  ElMessageBox.confirm(
    `是否直接生成<span style='color:red'> ${row.title} </span>台账?`,
    "生产台账",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    editMb(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "台账生成成功",
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
/deep/.el-radio-button__original-radio:checked + .el-radio-button__inner {
  background: #1f459c;
}
// /deep/.is-active {
//   background: #bfa;
// }
</style>
