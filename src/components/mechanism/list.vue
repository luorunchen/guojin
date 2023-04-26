<template>
  <div id="account" ref="account">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="企业选择">
        <el-select v-model="regionCompChange" class="m-2" placeholder="Select">
          <el-option v-for="item in getRegionCompList" :key="item.value" :label="item.company" :value="item.companyId" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
        <el-button type="primary" @click="uploadFun">上传</el-button>
        <el-button type="primary" @click="syncLaw">同步资料库文件</el-button>
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
    <!-- <el-table :data="tableData" stripe style="width: 100%;margin-bottom:50px" height="45vh">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="company" label="对应企业" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>

          <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom: 50px;" height="45vh">

      <el-table-column type="index" />
      <el-table-column property="title" label="标题" />
      <!-- <el-table-column property="name" label="板块" /> -->
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>

          <el-button size="small" type="success" @click="gotoBankFun(scope.row)">生成台账到企业</el-button>

        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :type="1" @changeList="changeList" />
    <Upload ref="upload" :status="status" :labelName="labelName" :ftp="'1'" :tid="props.tid" />
    <SeeFlie ref="seeFile" />
    <el-dialog v-model="dialogVisible" title="生成台账到企业" width="25%" center>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item label="企业选择">
          <el-select v-model="regionCompChange" class="m-2">
            <el-option v-for="item in getRegionCompList" :key="item.value" :label="item.company"
              :value="item.companyId" />
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="moveToCompanyFun">确定</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogTableVisible" title="同步资料库文件">
      <el-button type="primary" @click="syncDataBaseBankFun">确定同步</el-button>
      <el-divider />
      <el-table :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column property="title" label="标题" />
        <el-table-column property="name" label="板块" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script script lang = "ts" setup >
import { getInstBankInfo, delStandFileInfo, getRegionComp, moveToCompany, getDataBaseBank, viewCompanyList, syncDataBaseBank } from "@/api/index";
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
const seeROWID = ref();
const account = ref(null);

const status = ref("mechanism");
const table = ref(false);
const dialogVisible = ref(false);
const dialogTableVisible = ref(false);
const regionCompChange = ref("");
const getRegionCompList = ref([]);
const multipleSelection = ref([]);
const gridData = ref([]);
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
// watch(
//   () => props.boxHeight,
//   (val) => {
//     console.log(val, "123");
//     account.value.style.height = val + "px";
//     // console.log(law.value.clientHeight);
//     // fileInfoFun();
//   }
// );

onMounted(() => {
  fileInfoFun();
  getRegionCompFun();
});
const syncLaw = () => {
  dialogTableVisible.value = true;
  getDataBaseBank(props.tid, 1, 1000).then((res) => {
    gridData.value = res.data.data;
  });
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
// const syncDataBaseBankFun = (row) => {
//   let arr = [];
//   multipleSelection.value.forEach((element) => {
//     arr.push(element.id);
//   });
//   syncDataBaseBank(
//     props.tid,
//     sessionStorage.getItem("evaluation"),
//     props.status == '风控体系建设' || props.status == '应急预案(备案)' ? row.id : arr.toString()
//   ).then((res) => {
//     if (res.data.code == 200) {
//       ElMessage({
//         showClose: true,
//         message: "台账生成成功",
//         type: "success",
//       });
//       dialogTableVisible.value = false;
//       getDataBaseBank(props.tid, 1, 1000).then((res) => {
//         gridData.value = res.data.data;
//       });
//       getDataBaseBankFun()
//     } else {
//       ElMessage({
//         showClose: true,
//         message: res.data.msg,
//         type: "error",
//       });
//     }
//   });
// };
const moveToCompanyFun = () => {
  if (regionCompChange.value == '') {
    return ElMessage({
      showClose: true,
      message: '请选择公司',
      type: 'error'
    })
  }
  moveToCompany(props.tid, regionCompChange.value, seeROWID.value).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: '生成成功',
        type: 'success'
      })
    }

  })
}
const gotoBankFun = (row) => {
  dialogVisible.value = true
  seeROWID.value = row.id
}
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
  seeFile.value.show(row, 'law');
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
const syncDataBaseBankFun = (row) => {
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
      fileInfoFun()
      // getDataBaseBank(props.tid, 1, 1000).then((res) => {
      //   gridData.value = res.data.data;
      // });
      // getDataBaseBankFun()
    } else {
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: "error",
      });
    }
  });
};
//获取列表
const fileInfoFun = () => {
  getInstBankInfo(
    props.tid,
    input2.value,
    "",
    currentPage4.value,
    pageSize4.value,
    2
  )
    .then((res: any) => {
      // console.log(res, 99)
      tableData.value = res.data.data;
      total.value = res.data.dataCount;
    })
    .catch((err) => {
      console.log(err, 555);
    });


  // getDataBaseBank(props.tid, currentPage4.value,
  //   pageSize4.value).then(res => {
  //     tableData.value = res.data.data;
  //     total.value = res.data.dataCount;
  //   })
};
const getRegionCompFun = () => {
  // getRegionComp().then((res) => {
  //   getRegionCompList.value = res.data.data;
  // });

  viewCompanyList(currentPage4.value, pageSize4.value).then(res => {
    getRegionCompList.value = res.data.data
    // total.value = res.data.dataCount
  })
};
</script>

<style scoped lang="less">
// .demo-pagination-block {
//   position: absolute;
//   bottom: 10px;
//   right: 50px;
// }
// #account {
//   height: 500px;
// }
</style>
