<template>
  <div id="mapBox" ref="homepage">

  </div>
  <div class="title" v-if="baiduStatus">

    <div class="box">
      安全管理一张图

    </div>

  </div>
  <div class="btn" v-if="baiduStatus">
    <el-button type="primary" @click="myDis.open()"> 开始测距</el-button>
    <el-button type="primary" @click="myDis.close()">结束测距</el-button>
  </div>
  <div class="left" v-if="baiduStatus">
    <div class="top">
      <p>辖区数量</p>
      <div class="text">

        <el-row>
          <el-col :span="8">
            <img src="@/assets/people.png" alt="" />
            <p>机构备案数量</p>
            <p>{{ dataAnalysisList.instCount }} <span>家</span></p>
          </el-col>
          <el-col :span="8"><img src="@/assets/ssss.png" alt="" />
            <p>企业备案数量</p>
            <p>{{ dataAnalysisList.companyCount }} <span>家</span></p>
          </el-col>
          <el-col :span="8"><img src="@/assets/danger.png" alt="" />
            <p>危险场所数量</p>
            <p>{{ dataAnalysisList.dangerous }}<span>家</span></p>
          </el-col>
        </el-row>

      </div>
    </div>
    <div class="top">
      <p>物联设备统计</p>
      <div id="typeCount"></div>
    </div>
    <div class="top">
      <p>企业安全统计</p>
      <div id="score"></div>
    </div>

  </div>
  <div class="right" v-if="baiduStatus">
    <div class="top ">
      <p>隐患整改排行</p>
      <el-row v-for="item, index in compZG" :key="index" class="info1">
        <el-col :span="1">{{ index + 1 }}</el-col>
        <el-col :span="15">{{ item.company }}</el-col>
        <el-col :span="8">整改{{ item.delCount }}次</el-col>
      </el-row>
    </div>
    <div class="top">
      <p>企业隐患统计</p>
      <div class="text">

        <el-row>
          <el-col :span="8" v-for="item, index in hiddenInfo" :key="index">
            <img
              :src='item.hdLevelName.indexOf("较大") != -1 ? require("@/assets/yh22.png") : item.hdLevelName.indexOf("重大") != -1 ? require("@/assets/yh11.png") : require("@/assets/yh33.png")' />
            <p> {{ item.hdLevelName }}</p>
            <p>{{ item.hdcount }}</p>
          </el-col>

        </el-row>

      </div>

    </div>
    <div class="top">
      <p>企业隐患整改统计</p>
      <div class="text">

        <el-row>
          <el-col :span="8" v-for="item, index in hiddenInfo" :key="index">
            <img
              :src='item.hdLevelName.indexOf("较大") != -1 ? require("@/assets/yh22.png") : item.hdLevelName.indexOf("重大") != -1 ? require("@/assets/yh11.png") : require("@/assets/yh33.png")'
              alt="" />
            <p> {{ item.hdLevelName }}</p>
            <p>{{ item.hdcount }}</p>
          </el-col>

        </el-row>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { dataAnalysis, typeCount, score, hiddenLevelCount, getCompList, getInstList } from '@/api/index.js'
import { onMounted, ref, nextTick, watch } from "vue";
import { indexOf } from "lodash";
const dataAnalysisList = ref({});
const hiddenInfo = ref([]);
const compZG = ref([]);
const baiduStatus = ref(true)
const btnStatus = ref(false)
const myDis = ref()
onMounted(() => {
  mapFun()
  typeCountFun()
  scoreFun()
  dataAnalysis().then((res) => {
    dataAnalysisList.value = res.data.data;
  });
  hiddenLevelCount().then(res => {
    hiddenInfo.value = res.data.data.hiddenLevels
    compZG.value = res.data.data.compZG
  })
})
watch(() => baiduStatus.value, (val) => {
  if (val) {

  }
})
const typeCountFun = () => {
  typeCount().then(res => {
    nextTick(() => {

      // let type_name = []
      let data = []

      res.data.data.forEach(element => {
        data.push({ value: element.count, name: element.type_name })
      });
      type EChartsOption = echarts.EChartsOption
      var chartDom = document.getElementById("typeCount")!;


      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: "#fft"
          }

        },
        series: [
          {
            name: '设备数量',
            type: 'pie',
            radius: ['70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data
          }
        ]
      };

      option && myChart.setOption(option);
    })
  })

}
const scoreFun = () => {
  score().then(res => {
    nextTick(() => {

      // let type_name = []
      // let data = []

      // res.data.data.forEach(element => {
      //   data.push({ value: element.count, name: element.type_name })
      // });
      type EChartsOption = echarts.EChartsOption
      var chartDom = document.getElementById("score")!;


      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: "#fft"
          }

        },
        series: [
          {
            // name: '设备数量',
            type: 'pie',
            radius: ['70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: res.data.data.red, name: '红', itemStyle: { color: 'red' } },
              { value: res.data.data.blue, name: '蓝', itemStyle: { color: 'blue' } },
              { value: res.data.data.yellow, name: '黄', itemStyle: { color: 'yellow' } },
              { value: res.data.data.green, name: '绿', itemStyle: { color: 'green' } },

            ]
          }
        ]
      };

      option && myChart.setOption(option);
    })
  })
}
const mapFun = () => {
  var map = new BMapGL.Map('mapBox', {
    maxZoom: 21,

  });
  map.setMapStyleV2({
    styleId: '4ee9c4928e9bfe104cdaacf55406f39e'
  });
  var point = new BMapGL.Point(116.403850, 39.913795);
  map.centerAndZoom(point, 10);
  map.enableScrollWheelZoom();
  // var panorama = new BMapGL.Panorama('mapBox');
  // 添加全景图层
  // map.addTileLayer(new BMapGL.PanoramaCoverageLayer());

  // 添加全景控件
  var stCtrl = new BMapGL.PanoramaControl();
  stCtrl.setOffset(new BMapGL.Size(450, 100));
  map.addControl(stCtrl);
  // --- 添加行政区划 ---
  var dist = new BMapGL.DistrictLayer({
    name: '(温州市)',
    kind: 1,
    fillColor: '#030542',
    fillOpacity: 0.2,
    strokeColor: '#daeafa',
    viewport: true
  });
  map.addDistrictLayer(dist);
  myDis.value = new BMapGLLib.DistanceTool(map);
  // 监听测距过程中的鼠标事件
  myDis.value.addEventListener('drawend', function (e) {
    console.log("drawend");
    console.log(e.points);
    console.log(e.overlays);
    console.log(e.distance);
  });
  myDis.value.addEventListener("addpoint", function (e) {
    console.log("addpoint");
    console.log(e.point);
    console.log(e.pixel);
    console.log(e.index);
    console.log(e.distance);
  });
  myDis.value.addEventListener("removepolyline", function (e) {
    console.log("removepolyline");
    console.log(e);
  });
  let btn: any = document.getElementsByClassName('BMap_noprint')[0].setAttribute('id', 'shezhi')
  // console.log(btn[0].style.color, stCtrl);
  let btn2 = document.getElementById('shezhi')

  let btn3: any = document.getElementsByClassName('pano_close')[0].setAttribute('id', 'shezhi2')
  // console.log(btn[0].style.color, stCtrl);
  let btn4 = document.getElementById('shezhi2')
  console.log(btn3, btn4);
  // console.log(btn2);

  btn2.onclick = function () {
    // console.log(123);
    // btnStatus.value = true
    baiduStatus.value = !baiduStatus.value

  }

  btn4.addEventListener("click", function (e) {
    console.log(123);
    baiduStatus.value = true
    typeCountFun()
    scoreFun()
  })
  getInstList("", "", 1, 10).then((res) => {
    res.data.data.forEach((item) => {
      if (item.long_lat != null) {
        var myIcon = new BMapGL.Icon("https://a.amap.com/jsapi_demos/static/images/mass0.png", new BMapGL.Size(30, 30));
        // 创建Marker标注，使用小车图标
        var pt = new BMapGL.Point(item.long_lat.split(',')[0], item.long_lat.split(',')[1]);
        var marker = new BMapGL.Marker(pt, {
          icon: myIcon
        });
        // 将标注添加到地图
        map.addOverlay(marker);
      }
    });
  });
  getCompList("", "", 1, 10).then((res) => {
    res.data.data.forEach((item) => {
      // 创建小车图标


      if (item.long_lat != null) {
        var myIcon = new BMapGL.Icon("https://a.amap.com/jsapi_demos/static/images/mass0.png", new BMapGL.Size(30, 30));
        // 创建Marker标注，使用小车图标
        var pt = new BMapGL.Point(item.long_lat.split(',')[0], item.long_lat.split(',')[1]);
        var marker = new BMapGL.Marker(pt, {
          icon: myIcon
        });
        // 将标注添加到地图
        map.addOverlay(marker);
      }

    })
  });


}
</script>

<style lang="less" scoped>
#mapBox {
  height: calc(100vh);
  // margin: -15px;

}


.title {
  position: absolute;
  top: 0;
  // left: 400px;
  width: calc(100vw);
  height: 100px;
  background: #030542;
  z-index: 99999;
  padding-top: 1px;

  .box {

    width: calc(100vw - 800px);
    height: 70px;
    margin: 0 auto;
    margin-top: 10px;
    background-image: url('https://psy119.cn/lingdong1/static/img/juxing4.1095630b.png');
    background-size: 100% 100%;
    color: #fff;
    font-weight: 900;
    text-align: center;
    line-height: 70px;
    font-size: 40px;
  }
}

.btn {
  position: absolute;
  right: 450px;
  bottom: 20px;
  z-index: 999;
}

.text {
  padding: 5px 10px;
  // height: 150px;

  // margin-top: 40px;

  text-align: center;

  img {
    width: 30px;
    height: 30px;
  }

  p {
    &:nth-child(2) {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #000;
    }

    &:nth-child(3) {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #058ffeff;
    }
  }

  span {
    font-size: 12px;
  }
}


.left {
  width: 400px;
  height: calc(100vh - 100px);
  // background: #bfa;
  position: absolute;
  left: 0;
  top: 100px;
  z-index: 9999999999;
  overflow-y: auto;
  overflow-x: hidden;

  .top {
    width: 100%;
    height: calc(33vh);
    // background: #bfa;
    background-image: url('https://psy119.cn/lingdong1/static/img/zhengchangbili.1ed3e6c4.png');
    background-size: 100% 100%;

    &:nth-child(1) {
      height: calc(22vh);
      background-image: url('https://psy119.cn/lingdong1/static/img/juxing7.4c5a4618.png');

    }



    p {
      line-height: calc(5vh);
      text-align: center;
      color: #fff;
    }

    #typeCount {
      height: calc(33vh - 40px);
      width: 400px;
      // background: #bfa;
    }

    #score {
      height: calc(33vh - 40px);
      width: 400px;
      // background: #bfa;
    }
  }
}

.right {
  width: 400px;
  height: calc(100vh - 100px);
  // background: #bfa;
  position: absolute;
  right: 0;
  top: 100px;
  z-index: 9999999999;
  overflow-y: auto;
  overflow-x: hidden;

  .top {
    width: 100%;
    height: calc(33vh);
    // background: #bfa;
    background-image: url('https://psy119.cn/lingdong1/static/img/zhengchangbili.1ed3e6c4.png');
    background-size: 100% 100%;

    .text {
      margin-top: 40px;
    }

    &:nth-child(1) {
      height: calc(22vh);
      background-image: url('https://psy119.cn/lingdong1/static/img/juxing7.4c5a4618.png');
    }

    p {
      line-height: calc(5vh);
      text-align: center;
      color: #fff;
    }


  }

  .info1 {
    height: 160px;
    width: 350px;
    color: #fff;

    padding: 10px;

  }
}
</style>