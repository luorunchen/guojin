<template>
  <div id="homePage" ref="homepage">
    <el-tabs
      v-model="activeName"
      class="demo-tabs wapper"
      @tab-click="handleClick"
      ref="tab"
    >
      <el-tab-pane label="应急要闻" name="first">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="box">
              <el-carousel ref="imgages">
                <el-carousel-item v-for="item in 4" :key="item">
                  <img
                    src="http://yjglj.wenzhou.gov.cn/picture/-1/98d73409bf25401fa2ce4e89d4545d2b.jpg"
                    alt=""
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="14">
            <ul>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"
                    >2022年下半年全国英语等级考试成绩公布</el-col
                  >
                  <el-col :span="7">2022-04-05 10:00:20</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"
                    >2022年下半年全国英语等级考试成绩公布</el-col
                  >
                  <el-col :span="7">2022-04-05 10:00:20</el-col>
                </el-row>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="地方要闻" name="second">Config</el-tab-pane> -->
    </el-tabs>
    <div class="new" ref="new2">
      <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="五新商店" name="fiveNew">
          <div class="fiveNew">
            <div class="container" @click="fiveNew">
              <img src="../../assets/1.png" alt="" />
              新技术
            </div>
            <div class="container" @click="fiveNew">
              <img src="../../assets/2.png" alt="" />
              新工艺
            </div>
            <div class="container" @click="fiveNew">
              <img src="../../assets/3.png" alt="" />
              新设备
            </div>
            <div class="container" @click="fiveNew">
              <img src="../../assets/4.png" alt="" />
              新材料
            </div>
            <div class="container" @click="fiveNew">
              <img src="../../assets/5.png" alt="" />
              新产品
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
const activeName = ref("first");

const activeName2 = ref("fiveNew");
const emit = defineEmits(["fiveNewChang"]);
const tab: any = ref(null);
const homepage: any = ref(null);
const new2: any = ref(null);
const imgages: any = ref(null);
onMounted(() => {
  let box = tab.value.$el.clientHeight;
  let box3 = new2.value.clientHeight;
  let box2 = homepage.value.clientHeight;
  let box4 = (imgages.value.$el.style.height = box2 - box3 - 50 + "px");
  // console.log(987, box2, box3);
  console.log(box4);
  tab.value.$el.style.height = box2 - box3 + 20 + "px";
  // imgages.value.style.height = box2 - box3 - 50 + 'px'
});
const fiveNew = () => {
  emit("fiveNewChang", true);
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped>
// @import "~@/css/common.less";

#homePage {
  height: calc(100vh - 410px);
}

// @headerHeight: `$(
//   'homePage').height()`;
/* NOT WORKING */

.box {
  // height: 100%; // background: #bfa;
  // background: #bfa;

  /deep/.el-carousel__container {
    height: 100%; // height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  // justify-content: space-around;
}

.wapper {
  height: 63%;
}

.new {
  width: 1560px;
  // width: 100%;
  position: absolute;
  // position: relative;
  bottom: 5px;
  // box-sizing: border-box;
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
  width: 98%;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 0;

  // height: 270px;
  // height: 550px;

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