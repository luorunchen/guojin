<template>
  <div id="homePage" ref="homepage">
    <el-tabs v-model="activeName" class="demo-tabs wapper" @tab-click="handleClick" ref="tab">
      <div v-if="loginType == null || loginType == undefined">
        <video src="http://119.91.156.5:8080/download/mp3/74c024752138a6f7a1ef978dac75916a.mp4" ref="imgages"
          class="videoBox" controls></video>
      </div>
      <el-tab-pane v-else label="应急要闻" name="first">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="box">
              <el-carousel ref="imgages">
                <el-carousel-item v-for="item in carousel" :key="item">
                  <!-- <img src="http://yjglj.wenzhou.gov.cn/picture/-1/98d73409bf25401fa2ce4e89d4545d2b.jpg" alt="" /> -->
                  <img :src="item" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="14">
            <ul>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/4/7/art_1210123_58936214.html" class="bt_link"
                      title="温州两县（市、区）列入常态化自然灾害综合风险普查评估工作省级试点">温州两县（市、区）列入常态化自然灾害综合风险普查评估工作省级试点</a></el-col>
                  <el-col :span="7">2023-04-07</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/4/6/art_1210123_58936188.html" class="bt_link"
                      title="市森防指召开乡镇（街道）森林防灭火一体化创建推进会">市森防指召开乡镇（街道）森林防灭火一体化创建推进会</a></el-col>
                  <el-col :span="7">2023-04-06</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/4/4/art_1210123_58936170.html" class="bt_link"
                      title="全市防汛防台业务培训会在永嘉举办">全市防汛防台业务培训会在永嘉举办</a></el-col>
                  <el-col :span="7">2023-04-04</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/4/4/art_1210123_58936167.html" class="bt_link"
                      title="聚焦重点抓突破 突出实效促提升——我局召开全市应急数字化工作汇报会">聚焦重点抓突破 突出实效促提升——我局召开全市应急数字化工作汇报会</a></el-col>
                  <el-col :span="7">2023-04-04</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/4/3/art_1210123_58936165.html" class="bt_link"
                      title="全市安全生产基础工作座谈会暨环保设施安全生产专项整治行动部署会在瓯海区召开">全市安全生产基础工作座谈会暨环保设施安全生产专项整治行动部署会在瓯海区召开</a></el-col>
                  <el-col :span="7">2023-04-03</el-col>
                </el-row>
              </li>
              <li>
                <el-row justify="space-between">
                  <el-col :span="12"><a target="_blank"
                      href="http://yjglj.wenzhou.gov.cn/art/2023/3/31/art_1210123_58936137.html" class="bt_link"
                      title="市委直属机关工委巡听旁听市应急管理局党委理论学习中心组集体研讨会">市委直属机关工委巡听旁听市应急管理局党委理论学习中心组集体研讨会</a></el-col>
                  <el-col :span="7">2023-03-31</el-col>
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
              <img src="../../assets/3.png" alt="" />
              新设备
            </div>
            <div class="container" @click="fiveNew">
              <img src="../../assets/2.png" alt="" />
              新工艺
            </div>

            <div class="container" @click="fiveNew">
              <img src="../../assets/1.png" alt="" />
              新技术
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
  <!-- <div v-else id="homePage" ref="homepage"></div> -->
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const activeName = ref("first");
const loginType = sessionStorage.getItem("loginType");
const activeName2 = ref("fiveNew");
const emit = defineEmits(["fiveNewChang"]);
const tab: any = ref(null);
const homepage: any = ref(null);
const new2: any = ref(null);
const imgages: any = ref(null);
const store = useStore();
const carousel = ref([
  'http://yjglj.wenzhou.gov.cn/picture/0/s2212081033551037655.png',
  'http://yjglj.wenzhou.gov.cn/picture/-1/221213150521916273.png',
  'http://yjglj.wenzhou.gov.cn/picture/-1/5ee82821edfc46f298813364d8fcf0a4.jpg',
  'http://yjglj.wenzhou.gov.cn/picture/-1/6c224578104b4a55b5fbad898644e768.jpg'
])
onMounted(() => {


  // if (loginType == '3') {
  //   mapFun()
  //   return
  // }
  let box = tab.value.$el.clientHeight;
  let box3 = new2.value.clientHeight;
  let box2 = homepage.value.clientHeight;
  if (loginType != null || loginType != undefined) {

    let box4 = (imgages.value.$el.style.height = box2 - box3 - 120 + "px");
  } else {
    let box4 = (imgages.value.style.height = box2 - box3 - 100 + "px");
  }

  tab.value.$el.style.height = box2 - box3 - 60 + "px";
  // imgages.value.style.height = box2 - box3 - 50 + 'px'
});
const fiveNew = () => {
  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }
  emit("fiveNewChang", true);
  let arr = {
    title: '五新商店',
    status: '五新商店',
    id: 10088
    // content: '<EarlyWarning/>'
  }
  store.commit("setMenus", arr);
};
const mapFun = () => {
  let map = new AMap.Map("homePage", {
    center: [111.205467, 25.907761],
    resizeEnable: true,
    zoom: 4,
    mapStyle: "amap://styles/0acdc7a838973fbe4969d38644d9a726",
  });
  var district = null;
  var polygons = [];
  //加载行政区划插件
  if (!district) {
    //实例化DistrictSearch
    var opts = {
      subdistrict: 0,   //获取边界不需要返回下级行政区
      extensions: 'all',  //返回行政区边界坐标组等具体信息
      level: 'district'  //查询行政级别为 市
    };
    district = new AMap.DistrictSearch(opts);
  }
  //行政区查询
  // district.setLevel(document.getElementById('level').value)
  district.search('龙湾区', function (status, result) {
    map.remove(polygons)//清除上次结果
    polygons = [];
    var bounds = result.districtList[0].boundaries;
    if (bounds) {
      for (var i = 0, l = bounds.length; i < l; i++) {
        //生成行政区划polygon
        var polygon = new AMap.Polygon({
          strokeWeight: 1,
          path: bounds[i],
          fillOpacity: 0.4,
          fillColor: '#80d8ff',
          strokeColor: '#0091ea'
        });
        polygons.push(polygon);
      }
    }
    map.add(polygons)
    map.setFitView(polygons);//视口自适应
  });
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped>
// @import "~@/css/common.less";

#homePage {
  height: calc(100vh - 410px);
}

a {
  text-decoration: none;
}

.videoBox {
  width: 100%;
  height: 100px;
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
  // position: absolute;
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
    width: 280px;
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