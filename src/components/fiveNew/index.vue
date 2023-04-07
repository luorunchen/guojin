<template>
  <div id="userInfo">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="全部" name=""> </el-tab-pane>
      <el-tab-pane label="新技术" name="1">
        <!-- <MyUpload :activeName="activeName" /> -->
      </el-tab-pane>
      <el-tab-pane label="新工艺" name="2">
        <!-- <MyUpload :activeName="activeName" /> -->
      </el-tab-pane>
      <el-tab-pane label="新设备" name="3">
        <!-- <MyUpload :activeName="activeName" /> -->
      </el-tab-pane>
      <el-tab-pane label="新材料" name="4">
        <!-- <MyUpload :activeName="activeName" /> -->
      </el-tab-pane>

      <el-tab-pane label="我的上传" name="6">
        <!-- <MyUpload :activeName="activeName" /> -->
      </el-tab-pane>
      <MyUpload :activeName="activeName" :pageSizes="pageSizes" :currentPages="currentPages" @totalFun="totalFun" />
      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
    <Pagination :total="total" @changeList="changeList" />
  </div>
</template>

<script lang="ts" setup>
import MyUpload from "./myUpload/index.vue";
import Pagination from "../pagination/index.vue";
import { ref } from "vue";
const pageSizes = ref(10);
const currentPages = ref(1);
const total = ref(0);
const activeName = ref("");
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, type);
  pageSizes.value = pageSize;
  currentPages.value = currentPage;

  // console.log(currentPages.value, "currentPages.value");
};
const totalFun = (totalData) => {
  total.value = totalData;

  console.log(totalData, 987);
};
</script>


<style lang="less" scoped>
#userInfo {
  // width: 1460px;
  // height: 720px;
  position: relative;

  .upload-demo {
    width: 100%;
  }

  .demo-tabs {
    margin-top: 10px;

    padding: 10px;
    padding-bottom: 50px;
    box-sizing: border-box;
    // height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
  }
}
</style>