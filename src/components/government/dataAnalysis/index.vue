<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="20">
        <div class="text">
          <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
            <el-tab-pane label="平台数据分析" name="first">
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
                  <p>危险性场所数量</p>
                  <p>{{ dataAnalysisList.instCount }}<span>家</span></p>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="textBottom">
          <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
            <el-tab-pane label="近7日在线执法近处理情况" name="first">
              <div id="echarts" v-if="echarBox"></div>
            </el-tab-pane></el-tabs>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="right">
          <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
            <el-tab-pane label="台账完成度排名" name="first">
              <ul>
                <li v-for="(item, index) in tzRankList" :key="index">
                  <el-row>
                    <el-col :span="2">{{ index + 1 }}</el-col>
                    <el-col :span="18">{{ item.company }}</el-col>
                    <el-col :span="4">{{ item.score }}分</el-col>
                  </el-row>
                </li>
              </ul>
            </el-tab-pane></el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { nextTick, onMounted, ref } from "vue";
import { tzRank, dataAnalysis } from "@/api/index.js";
const activeName = ref("first");
const tzRankList = ref([]);
const dataAnalysisList = ref({});
const echarBox = ref(false)
const loginType = sessionStorage.getItem("loginType");
onMounted(() => {
  echartsFun();
  tzRankFun();
  console.log('22222');

  // if (loginType == '3') {

  //   return
  // }
});
const echartsFun = () => {

  nextTick(() => {

    type EChartsOption = echarts.EChartsOption
    var chartDom = document.getElementById("echarts")!;
    console.log(chartDom, 'DDDDDDD');

    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    option && myChart.setOption(option);
  })

};

const tzRankFun = () => {
  tzRank(1, 10).then((res) => {
    tzRankList.value = res.data.data;
  });
  dataAnalysis().then((res) => {
    dataAnalysisList.value = res.data.data;
  });
};


</script>

<style lang="less" scoped>
.row {
  margin-top: 10px;

  .text {
    padding: 0 10px;
    // height: 150px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    text-align: center;

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
      font-size: 14px;
    }
  }

  .textBottom {
    padding: 0 10px;
    margin-top: 10px;
    height: 340px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    // width: 100%;

    #echarts {
      height: 300px;
      width: 100%;
      // width: 700px;
      // background: #bfa;
    }
  }

  .right {
    padding: 0 10px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    font-size: 14px;
  }
}
</style>