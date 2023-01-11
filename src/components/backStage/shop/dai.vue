<template>
  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="所属分类:">
        <el-select v-model="formInline.region" clearable placeholder="请选择">
          <el-option label="新技术" value="1" />
          <el-option label="新工艺" value="2" />
          <el-option label="新设备" value="3" />
          <el-option label="新材料" value="4" />
          <el-option label="新产品" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" v-if="props.status">
        <el-select
          v-model="formInline.type"
          clearable
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option label="已通过" value="1" />
          <el-option label="未通过" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getWxAuditFun('select')"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="gridData" height="550px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人" />
      <el-table-column prop="audit_name" label="所属类型">
        <template #default="scope">
          {{
            scope.row.type == 1
              ? "新技术"
              : scope.row.type == 2
              ? "新工艺"
              : scope.row.type == 3
              ? "新设备"
              : scope.row.type == 4
              ? "新材料"
              : "新产品"
          }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="reason" label="" v-if="props.status" /> -->
      <el-table-column
        prop="reason"
        label="驳回原因"
        v-if="props.status && formInline.type == '2'"
      />
      <el-table-column prop="audit_name" label="审核人员" v-if="props.status" />
      <el-table-column prop="audit_date" label="审核时间" v-if="props.status" />
      <el-table-column prop="audit_name" label="封面图片">
        <template #default="scope">
          <img :src="scope.row.cover_image" alt="" />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="audit_name" label="产品图片">
        <template #default="scope">
          <img :src="scope.row.product_image" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="product_introduce" label="产品介绍" />
      <el-table-column prop="product_super" label="产品优势" /> -->
      <!-- <el-table-column prop="address" label="地址" /> -->
      <!-- <el-table-column prop="create_name" label="审核状态">
        <template #default="scope">
          {{
            scope.row.status == 0
              ? "未审核"
              : scope.row.status == 1
              ? "已通过"
              : "未通过"
          }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="drawerOpen(scope.row)"
            >详情</el-button
          >
          <template v-if="!props.status">
            <el-button size="small" type="primary" @click="adopt(scope.row)"
              >通过</el-button
            >
            <el-button size="small" type="danger" @click="fail(scope.row)"
              >不通过</el-button
            ></template
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />

    <el-drawer v-model="drawer" size="80%" :title="drawerRow.title">
      <div>
        <h3>产品图片</h3>
        <div class="demo-image__preview">
          <el-image
            class="elImage"
            :src="drawerRow.product_image"
            :preview-src-list="[drawerRow.product_image]"
            :zoom-rate="1.2"
            :initial-index="4"
          />
        </div>
        <h3>产品优势</h3>
        <p>
          {{ drawerRow.product_super }}
        </p>
        <h3>产品介绍</h3>
        <p>{{ drawerRow.product_introduce }}</p>
      </div>

      <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs> -->
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { getWxAudit, auditWxStore, getHY } from "@/api/index.js";
import { onMounted, reactive, ref } from "vue";
import Pagination from "../../pagination/index.vue";

import { tableV2RowProps, TabsPaneContext } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps({
  status: Boolean,
});

const formInline = reactive({
  user: "",
  region: "",
  type: "1",
});
const ruleForm = reactive({
  name: "Hello",
  resource: [],
  industry: "",
});
const currentPage3 = ref(1);
const pageSize3 = ref(10);
const gridData = ref([]);

const industryList = ref([]);
const total = ref(0);

const drawerRow = ref({
  title: "",
});
const drawer = ref(false);

onMounted(() => {
  console.log(props.status, 987);

  getWxAuditFun("");
  getHYFun();
});
//列表
const getWxAuditFun = (select: string) => {
  getWxAudit(
    formInline.user,
    "",
    formInline.region,
    currentPage3.value,
    pageSize3.value,
    !props.status ? "0" : formInline.type
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

const adopt = (row: any) => {
  ElMessageBox.confirm(
    `确定通过<span style="color:red">${row.title}</span>嘛?`,
    "审核",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    auditWxStore(row.id, 1, "").then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          type: "success",
          message: "审核通过",
          showClose: true,
        });
        getWxAuditFun("");
      }
    });
  });
};
const fail = (row: any) => {
  ElMessageBox.prompt(
    `确定驳回<span style="color:red">${row.title}</span>嘛?请填写驳回原因`,
    "审核",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then((value) => {
    console.log(value.value, 987);

    auditWxStore(row.id, 2, value.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          type: "success",
          message: "驳回成功",
          showClose: true,
        });
        getWxAuditFun("");
      }
    });
  });
};

//行业列表
const getHYFun = () => {
  getHY().then((res) => {
    industryList.value = res.data.data;
  });
};
//行业列表
const selectChange = (e) => {
  console.log(e, 98);
  getWxAuditFun("");
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab)
};

const drawerOpen = (row) => {
  drawer.value = true;
  drawerRow.value = row;
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
  getWxAuditFun("");
};
</script>

<style lang="less" scoped>
.top {
  width: 1560px;
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
  width: 1560px;
  height: 640px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  img {
    width: 100px;
    height: 100px;
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
  padding: 0 40px;
  // font-size: 30px;
  // position: fixed;
  .el-drawer__title {
    font-size: 25px;
    color: #000;
  }
  h3 {
    border-bottom: 1px solid #eff1f4;
    border-left: 4px solid #0165d0;
    padding-left: 20px;
    margin-top: 50px;
  }
  .info {
    padding: 30px;
  }

  .el-form-item {
    width: 46%;
  }
  p {
    text-indent: 2em;
  }
  .elImage {
    width: 200px;
    height: 200px;
    margin-top: 10px;
  }
}
</style>