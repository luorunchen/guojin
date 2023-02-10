<template>
  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item orm-item label="会员类型:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="平台年费" value="1" />
          <el-option label="五新商店年费" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item orm-item label="年费类型:">
        <el-date-picker
          v-model="selectTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getExpireUserFun('select')"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="gridData" height="550px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="username" label="用户名称" />
      <el-table-column prop="name" label="会员类型">
        <template #default="scope">
          {{ scope.row.type == 1 ? "平台会员" : "五新商店会员" }}
        </template>
      </el-table-column>
      <el-table-column prop="pay_date" label="起始时间" />
      <el-table-column prop="expire_date" label="到期时间" />
      <!-- <el-table-column prop="o" label="套餐年限" /> -->
      <!-- <el-table-column prop="create_name" label="审核类型">
        <template #default="scope">
          {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="drawerOpen(scope.row)"
            >详情</el-button
          >
          <!-- <el-button size="small" type="primary" @click="drawerOpen(scope.row)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />

    <el-dialog v-model="drawer" width="60%" :title="drawerTitle">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="缴费历史" name="first">
          <el-table :data="getPayHistoryList" height="550px">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="套餐名称" />
            <el-table-column prop="name" label="年费类型">
              <template #default="scope">
                {{ scope.row.type == 1 ? "平台年费" : "五新商店年费" }}
              </template>
            </el-table-column>
            <el-table-column prop="pay_date" label="起始时间" />
            <el-table-column prop="expire_date" label="结束时间" />
            <el-table-column prop="price" label="价格" />
            <!-- <el-table-column prop="o" label="套餐年限" /> -->
            <!-- <el-table-column prop="create_name" label="审核类型">
                            <template #default="scope">
                              {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
                            </template>
                          </el-table-column> -->
            <!-- 
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  @click="drawerOpen(scope.row)"
                  >详情</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click="drawerOpen(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Pagination from "../../pagination/index.vue";

import { getExpireUser, getPayHistory } from "@/api/index";
// import { tableV2RowProps, TabsPaneContext } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
const formInline = reactive({
  user: "",
  region: "1",
});

const currentPage3 = ref(1);
const pageSize3 = ref(10);
const gridData = ref([]);
const getPayHistoryList = ref([]);

const total = ref(0);

const selectTime = ref([]);

const drawer = ref(false);
const activeName = ref("first");
const drawerTitle = ref("");

const onSubmit = () => {
  console.log("submit!");
};

onMounted(() => {
  getExpireUserFun("");
});

//列表
const getExpireUserFun = (select: string) => {
  console.log(selectTime.value);

  getExpireUser(
    formInline.user,
    formInline.region,
    0,
    selectTime.value.length == 0 ? "" : selectTime.value[0],
    selectTime.value.length == 0 ? "" : selectTime.value[1],
    currentPage3.value,
    pageSize3.value
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

const drawerOpen = (row) => {
  drawer.value = true;
  drawerTitle.value = row.company;
  getPayHistory(row.username, currentPage3.value, pageSize3.value).then(
    (res) => {
      getPayHistoryList.value = res.data.data;
    }
  );
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
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

/deep/.el-dialog {
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