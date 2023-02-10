<template>
  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号名称:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="正常" :value="0" />
          <el-option label="封禁" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCompanyListFun('select')"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="gridData" height="450px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="username" label="账号名称" />

      <el-table-column prop="address" label="状态">
        <template #default="scope">
          {{ scope.row.state == 1 ? "封禁" : "正常" }}
          <!-- <el-switch v-model="value2" class="mb-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="正常" inactive-text="封禁" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <!-- {{ scope.row.state == 0 ? '封禁' : '正常' }} -->
          <el-switch
            v-model="value2[scope.$index]"
            class="mb-2"
            @change="switchChange(scope.$index, scope.row)"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :loading="loading"
          />
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, defineProps } from "vue";
import Pagination from "../../pagination/index.vue";
// import SeeFlie from "../../seeFlie/index.vue"
import { getUserInfo, banUser } from "@/api/index";

import { ElMessage, ElMessageBox } from "element-plus";
const formInline = reactive({
  user: "",
  region: "",
});

const currentPage3 = ref(1);
const value2 = ref([]);
const pageSize3 = ref(10);
const loading = ref(false);
const gridData = ref([]);
const industryList = ref([]);
const total = ref(0);
const type = ref(1);

const props = defineProps({
  type: Number,
});

onMounted(() => {
  getUserInfoFun("");
});
//列表
const getUserInfoFun = (select: string) => {
  getUserInfo(
    formInline.user,
    formInline.region,
    currentPage3.value,
    pageSize3.value,
    props.type
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
    gridData.value.forEach((item, index) => {
      item.state == 1
        ? (value2.value[index] = false)
        : (value2.value[index] = true);
    });
    console.log(value2.value, 977);
  });
};
//滑块
const switchChange = (index, row) => {
  // console.log();
  loading.value = true;
  let flag = value2.value[index];
  ElMessageBox.confirm(
    `是否${!flag ? "禁用" : "解封"}<span style='color:red'>${
      row.username
    }</span>账号`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      loading.value = false;
      banUser(row.id, flag ? 0 : 1).then((res) => {
        if (res.data.code == 200) {
          ElMessage({
            type: "success",
            message: "操作成功",
            showClose: true,
          });
        } else {
          value2.value[index] = !value2.value[index];
        }
      });
    })
    .catch(() => {
      value2.value[index] = !value2.value[index];
      loading.value = false;
    });
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
  getUserInfoFun("");
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
}
</style>