<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="box">
        <p>类目表</p>
        <el-tree :data="databasesList" :props="defaultProps" @node-click="handleNodeClick" highlight-current accordion />
      </div>
    </el-col>
    <el-col :span="18">
      <div class="top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="文件名称:">
            <el-input v-model="formInline.user" placeholder="请输入" />
          </el-form-item>
          <!-- <el-form-item label="版块:">

            <el-cascader v-model="formInline.tid" clearable :options="databasesList" @change="handleChange"
              :props="{ value: 'id', label: 'name' }" />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="getCompanyListFun('select')">查询</el-button>
            <el-button type="primary" @click="uploadFun('AccountList')">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="gridData" height="550px">
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="create_date" label="上传时间" />
          <el-table-column prop="create_name" label="上传人员" />
          <el-table-column prop="name" label="版块" />
          <el-table-column prop="address" label="操作" width="250">
            <template #default="scope">
              <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
              <!-- <el-button size="small" type="primary" @click="onlineEditing(scope.row)">同步台账</el-button> -->
              <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :total="total" @changeList="changeList" />
        <SeeFlie ref="seeFile"></SeeFlie>
        <Upload ref="upload" :status="status" @uploadSuccess="uploadSuccess" :labelName="labelName" :ftp="'1'"
          :switchStatus="switchStatus" :markerID="markerID" :tid="formInline.tid" />
      </div>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" title="同步台账" width="30%" center>
    <el-tree :data="databasesList" :props="defaultProps" show-checkbox @check="handleCheckChange" node-key="id" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="treeTrue">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
        
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Pagination from "../../pagination/index.vue";
import SeeFlie from "../../seeFlie/index.vue";
import Upload from "../../upload/index.vue";
import {
  getCompanyStandInfo,
  getHY,
  delStandFileInfoManage,
  getStandList,
} from "@/api/index";

import { ElMessage, ElMessageBox } from "element-plus";
const formInline = reactive({
  user: "",
  region: "",
  tid: "",
});

const currentPage3 = ref(1);
const pageSize3 = ref(10);
const gridData = ref([]);
const industryList = ref([]);
const labelName: any = ref([]);
const databasesList: Tree[] = ref([]);
const total = ref(0);
const upload = ref(null);
const switchStatus = ref(null);
const seeFile = ref(null);
const status = ref('AccountList');
const markerID = ref();
const dialogVisible = ref(false)
const defaultProps = {
  children: "children",
  label: "name",
};

onMounted(() => {
  getCompanyListFun("");
  // getHYFun()
  getStandList().then((res) => {
    console.log([res.data.data[0].children[0], res.data.data[0].children[1]]);

    databasesList.value = [
      res.data.data[0].children[0],
      res.data.data[0].children[1],
    ];
  });
});

const handleCheckChange = (data, value) => {
  console.log(value)
}

//在线编辑``
const onlineEditing = (row: any) => {
  dialogVisible.value = true
  // console.log(row);
  // seeFile.value.show(row, "account");
};
const handleNodeClick = (data: Tree) => {
  sessionStorage.setItem("tid", data.id);
  console.log(data.name, data, "data");
  if (data.name == "安全生产管理台账") {
    switchStatus.value = true;
  }
  if (data.name == "专项台账") {
    switchStatus.value = false;
  }

  // switchStatus.value = data.name=='安全生产管理台账'?
  formInline.tid = data.id;

  console.log(formInline.tid, 999);

  labelName.value = {
    name: data.name,
    tid: data.id,
    parent_id: data.parent_id,
    // contian:data.
  };
  // digui([data])
  // console.log(formInline.tid)
  getCompanyListFun("");
};
// const digui = (item) => {
//   item.forEach(element => {
//     formInline.tid.push(element.id)
//     // console.log(item);

//     if (element.children.length > 0) {
//       digui(element.children)
//     }
//   });
// }
const handleChange = (value) => {
  // console.log(value, 'ii');

  formInline.tid = value[value.length - 1];
};
//文件上传成功回调
const uploadSuccess = (data) => {
  // console.log(data, '成功');
  getCompanyListFun("");
};
//企业列表
const getCompanyListFun = (select: string) => {
  getCompanyStandInfo(
    "",
    formInline.user,
    "",
    formInline.tid.toString(),
    1,
    currentPage3.value,
    pageSize3.value
  ).then((res) => {
    total.value = res.data.dataCount;
    gridData.value = res.data.data;
    // res.data.data.forEach((item) => {
    //   item.id = "d" + item.id;
    // });
    if (!(res.data.code == 200 && res.data.dataCount > 0)) {
      if (select != "") {
        ElMessage({
          message: "暂无查询数据",
          type: "error",
          showClose: true,
        });
      }
    }
  });
  // getCompanyList(formInline.user, formInline.region, pageSize3.value, currentPage3.value).then(res => {

  //
  //   total.value = res.data.dataCount
  //   gridData.value = res.data.data
  // })
};
const treeTrue = () => {
  ElMessage({
    showClose: true,
    message: '功 ',
    type: 'error'
  })
}
const uploadFun = (data, id) => {
  markerID.value = id
  status.value = data
  upload.value.show();
};
//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.title}</span>文件?`,
    "审核文件",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delStandFileInfoManage(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        getCompanyListFun("");
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
  seeFile.value.show(row, "law");
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
  width: 100%;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;
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
</style>