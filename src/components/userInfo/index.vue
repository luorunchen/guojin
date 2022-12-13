<template>
  <div id="userInfo">
    <div class="box">
      我的身份: <span>企业VIP</span> (到期时间:2025-05-05)
    </div>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">

      <el-tab-pane label="账号管理" name="first">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="input2" placeholder="关键词">
              <template #append>
                <el-button type="primary">搜索</el-button>
              </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="uploadFun">上传文件</el-button>
            <!-- <el-button type="primary" @click="getAuditFilesFun">待审核文件</el-button> -->
          </el-col>
        </el-row>
        <br />
        <el-table :data="tableData" stripe style="width: 100%" height="370px">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="我的缴费" name="second">我的缴费</el-tab-pane>
      <el-tab-pane label="我的发票" name="third">我的发票</el-tab-pane>

      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
    <Pagination :total="total" @changeList="changeList" />
  </div>

</template>

<script lang="ts" setup>
import Pagination from '../pagination/index.vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')
const total = ref(0)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },

]
const changeList = () => { }
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>


<style lang="less" scoped>
#userInfo {
  width: 1460px;
  height: 720px;
  position: relative;

  .box {


    margin-top: 10px;
    height: 69px;
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px #EBEBEB;
    border-radius: 4px;
    line-height: 69px;
    font-size: 20px;
    padding-left: 20px;
    color: #666E76FF;

    span {
      color: #058FFEFF;
    }
  }

  .demo-tabs {
    margin-top: 10px;

    padding: 10px;
    box-sizing: border-box;
    height: 650px;
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px #EBEBEB;
    border-radius: 4px;
  }
}
</style>