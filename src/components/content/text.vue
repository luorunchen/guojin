<template>
  <div class="text">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="安全生产管理体检" name="first">
        <div class="textBox">
          <el-row>
            <el-col :span="14">
              <div class="box">
                <h1>智慧安全，全方位守护</h1>
                <el-button type="success" color="#058FFE">全面体检</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="imgBox">
                <img src="../../assets/text.png" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="conter">
          <p>目标职责</p>
          <p>制度化管理</p>
          <p>教育培训</p>
          <p>隐患排查治理</p>
          <p>应急管理</p>
          <p>事故管理</p>
          <p>持续改进</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="五新商店" name="fiveNew">
      <div class="fiveNew">
        <div class="container">
          <img src="../../assets/1.png" alt="" />
          新技术
        </div>
        <div class="container">
          <img src="../../assets/2.png" alt="" />
          新工艺
        </div>
        <div class="container">
          <img src="../../assets/3.png" alt="" />
          新设备
        </div>
        <div class="container">
          <img src="../../assets/4.png" alt="" />
          新材料
        </div>
        <div class="container">
          <img src="../../assets/5.png" alt="" />
          新产品
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
const activeName = ref("first");

const activeName2 = ref("fiveNew");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped>
.textBox {
  // width: 1442px;
  height: 395px;
  background: #d8f1fd;

  .box {
    text-align: center;
    margin-top: 150px;

    h1 {
      margin-bottom: 20px;
      font-size: 52px;
    }

    /deep/.el-button--success {
      width: 211px;
      height: 57px;
      font-size: 20px;
      border-radius: 29px;
    }
  }

  .imgBox {
    img {
      width: 387px;
      height: 386px;
    }
  }

  // line-height: 330px;
}

.conter {
  // height: 80px;
  // background: #bfa;

  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  p {
    font-weight: 600;
    color: #43454d;
    text-align: center;
    line-height: 76px;
    width: 164px;
    height: 76px;
    font-size: 19px;
    background: #d8effd;
    border-radius: 10px;
  }
}

.fiveNew {
  // background: rgb(10, 213, 196);
  display: flex;
  justify-content: space-between;
  line-height: 100px;

  .container {
    width: 263px;
    height: 110px;
    background: #eef1fb;
    text-align: center;
    line-height: 110px;
    border-radius: 10px;
    font-size: 22px;

    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

.demo-tabs {
  // width: 98%;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 0;

  /deep/.el-tabs__item.is-active {
    font-weight: bold;
    color: #2c7aff;
  }

  ul {
    margin-left: 20px;

    li {
      // margin-top: 20px;

      list-style-type: square;
      margin-bottom: 10px;

      &::marker {
        color: #2c7aff;
      }
    }
  }

  // padding: 32px;
  // color: #6b778c;
  // font-size: 32px;
  // font-weight: 600;
}
</style>