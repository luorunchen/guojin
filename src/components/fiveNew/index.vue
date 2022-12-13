<template>
  <div id="userInfo">


    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">

      <el-tab-pane label="全部" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="formInline.user" placeholder="Approved by" />
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="formInline.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="5">
            <img src="../../assets/1111.png" alt="">
            <p>标题</p>
            <el-tag>新技术</el-tag>
          </el-col>

          <el-col :span="5">
            <img src="../../assets/1111.png" alt="">
            <p>标题</p>
            <el-tag>新技术</el-tag>
          </el-col>
          <el-col :span="5">
            <img src="../../assets/1111.png" alt="">
            <p>标题</p>
            <el-tag>新技术</el-tag>
          </el-col>
          <el-col :span="5">
            <img src="../../assets/1111.png" alt="">
            <p>标题</p>
            <el-tag>新技术</el-tag>
          </el-col>
          <el-col :span="4">
            <img src="../../assets/1111.png" alt="">
            <p>标题</p>
            <el-tag>新技术</el-tag>
          </el-col>

        </el-row>

      </el-tab-pane>
      <el-tab-pane label="新技术" name="second">
      </el-tab-pane>
      <el-tab-pane label="新工艺" name="third">我的发票</el-tab-pane>
      <el-tab-pane label="新设备" name="1">我的发票</el-tab-pane>
      <el-tab-pane label="新材料" name="2">我的发票</el-tab-pane>
      <el-tab-pane label="新产品" name="3">我的发票</el-tab-pane>
      <el-tab-pane label="我的上传" name="4">我的发票</el-tab-pane>

      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
    <Pagination :total="total" @changeList="changeList" />
  </div>

</template>

<script lang="ts" setup>
import Pagination from '../pagination/index.vue'
import { ref, reactive } from 'vue'
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
const formInline = reactive({
  user: '',
  region: '',
})

const onSubmit = () => {
  console.log('submit!')
}
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

    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>