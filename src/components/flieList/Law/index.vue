<template>
  <div id="law" ref="law">
    <div v-if="props.titleChangeName == '隐患排查治理'">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="left">
        <el-form-item label="检查项">
          <el-input v-model="formInline.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="检查项行业">
          <el-select v-model="formInline.trade" placeholder="请选择" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item, index in HYList" :key="index" />

          </el-select>
        </el-form-item>
        <el-form-item label="检查项领域">
          <el-select v-model="formInline.region" placeholder="请选择" clearable>
            <el-option :label="item.domainName" :value="item.domain" v-for="item, index in DomainList" :key="index" />

          </el-select>
        </el-form-item>
        <el-form-item label="场所环节">
          <el-input v-model="formInline.place" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="隐患等级">
          <el-select v-model="formInline.level" placeholder="请选择" clearable>
            <el-option :label="item.hdLevelName" :value="item.hdLevel" v-for="item, index in HdLevel" :key="index" />

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hiddenListFun">查询</el-button>
        </el-form-item>
        <!-- <el-row>
          <el-col :span="8">
           </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8">
          
          </el-col>
        </el-row> -->




      </el-form>
      <!-- <br /> -->
      <el-table :data="tableData" style="width: 100%;margin-bottom: 50px;" stripe height="400px" v-loading="loading"
        element-loading-text="正在加载中..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(255, 255, 255)">
        <el-table-column type="index" width="50" />
        <el-table-column prop="standard" label="检查项">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.standard" placement="top-start">
              <span class="textp">{{ scope.row.standard }}</span>
            </el-tooltip>

          </template>
        </el-table-column>

        <el-table-column prop="chkstdIndustryName" label="检查项行业" />
        <el-table-column prop="domainName" label="检查项领域" />
        <el-table-column prop="hdTypeName" label="隐患类别" />
        <el-table-column prop="hdLevelName" label="隐患等级" />
        <el-table-column prop="create_name" label="必须检查">

          <template #default="scope">
            <!-- <el-button size="small" type="primary">查看</el-button> -->
            {{ scope.row.mustCheck == 1 ? '是' : '否' }}

          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="seeInfo(scope.row)">查看</el-button>
            <!-- <el-button size="small" type="primary" @click="selectFun(scope.row)">选择 </el-button> -->

          </template>
        </el-table-column>
      </el-table>
    </div>


    <div v-else>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="input2" placeholder="关键词">

          </el-input>

        </el-col>
        <!-- <el-col :span="8" v-if="props.titleChangeName == '设备设施'">
        <el-input v-model="input2" placeholder="百科搜索">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col> -->
        <el-col :span="8">
          <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          <el-button type="primary" @click="baikeFun" v-if="props.titleChangeName == '设备设施'">百科搜索</el-button>

        </el-col>
      </el-row>

      <br />



      <el-table :data="tableData" style="width: 100%;margin-bottom: 50px;" stripe height="400px" v-loading="loading"
        element-loading-text="正在加载中..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(255, 255, 255)">
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
    </div>
    <el-dialog v-model="dialogVisible" width="60%">
      <el-descriptions title="详情信息" :column="2" border class-name="colName">

        <el-descriptions-item label="检查项" label-align="right" align="center" class-name="colName">{{ seeInfoRow.standard
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项行业" label-align="right" align="center" class-name="colName">{{
          seeInfoRow.chkstdIndustryName
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项领域" label-align="right" align="center">{{ seeInfoRow.domainName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患类别" label-align="right" align="center">{{ seeInfoRow.hdTypeName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患等级" label-align="right" align="center">{{ seeInfoRow.hdLevelName
        }}</el-descriptions-item>
        <el-descriptions-item label="必须检查" label-align="right" align="center">{{ seeInfoRow.mustCheck == 1 ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="场所环节" label-align="right" align="center">{{ seeInfoRow.placeLink
        }}</el-descriptions-item>
        <el-descriptions-item label="法律规定" label-align="right" align="center">{{ seeInfoRow.according
        }}</el-descriptions-item>
        <el-descriptions-item label="法律责任" label-align="right" align="center">{{ seeInfoRow.liability
        }}</el-descriptions-item>

      </el-descriptions>

    </el-dialog>


    <AuditFile ref="auditFile" />

    <Pagination :total="total" @changeList="changeList" />
    <Upload ref="upload" :status="status" :labelName="labelName" :tid="props.tid" />
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>
</template>

<script lang="ts" setup>
import {
  fileInfo,
  getAuditFiles,
  auditContent,
  delFileInfo,
  hiddenList,
  getDomainList,
  getHdLevel,
  getHYHome
} from "@/api/index";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import SeeFlie from "../../seeFlie/index.vue";
import Upload from "../../upload/index.vue";
import Pagination from "../../pagination/index.vue";
import AuditFile from "../../auditFile/index.vue";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const currentPage3 = ref(1);
const pageSize3 = ref(10);
const total = ref(0);
const law = ref(null);
const labelName = ref([]);
const status = ref("Law");

const dialogVisible = ref(false);
const gridData = ref([]);
const formInline = reactive({
  user: "",
  region: "",
  level: '',
  trade: '',
  place: ""
});
const DomainList = ref([])
const HdLevel = ref([])
const HYList = ref([])
const store = useStore();
const seeFile: any = ref(null);
const seeInfoRow: any = ref(null);
const auditFile: any = ref(null);
const upload: any = ref(null);
const tableData = ref([]);
const input2 = ref();
const props = defineProps({
  tid: Number,
  boxHeight: Number,
  titleChangeName: String
});
const loading = ref(false);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
watch(
  () => props.tid,
  (val) => {
    // console.log(val, "props");
    fileInfoFun();
  }
);



onMounted(() => {
  // law.value.style.height = props.boxHeight + "px";

  if (props.titleChangeName == '隐患排查治理') {
    getDomainList().then(res => {
      DomainList.value = res.data.data
    })
    getHdLevel().then(res => {
      HdLevel.value = res.data.data
    })
    getHYHome().then(res => {
      HYList.value = res.data.data
    })
    hiddenListFun()
  } else {
    fileInfoFun();
  }

});
const seeInfo = (row) => {
  dialogVisible.value = true
  seeInfoRow.value = row
}
const hiddenListFun = () => {
  hiddenList(
    formInline.user,
    formInline.trade,
    formInline.region,
    formInline.level,
    formInline.place,
    currentPage4.value,
    pageSize4.value
  ).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
}

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.title}</span>文件?`,
    "审核文件",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delFileInfo(row.id).then((res) => {
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
  // console.log(row, 98);

  // row.id = "d" + row.id;
  seeFile.value.show(row, "law");
};
const baikeFun = () => {
  // window.open(`https://baike.baidu.com/item/${input2.value}`)
  seeFile.value.show(input2.value, "baike");
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;

  props.titleChangeName == '隐患排查治理' ? hiddenListFun() : fileInfoFun();

};
const uploadFun = () => {
  // labelName.value=
  upload.value.show();
};
const onSubmit = () => {
  console.log("submit!");
};
//获取列表
const fileInfoFun = () => {
  loading.value = true
  fileInfo(
    props.tid,
    currentPage4.value,
    pageSize4.value,
    input2.value
  )
    .then((res: any) => {
      // console.log(res, 99)
      // res.data.data.forEach((item) => {
      //   item.id = "d" + item.id;
      // });
      loading.value = false
      tableData.value = res.data.data;
      total.value = res.data.dataCount;
    })
    .catch((err) => {
      console.log(err, 555);
    });
};
</script>

<style scoped lang="less">
// #law {
//   height: 100%;
// }
.textp {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

/deep/.colName {
  width: 40%
}
</style>
