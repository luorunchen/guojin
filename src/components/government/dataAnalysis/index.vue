<template>
  <el-row :gutter="20" class="row">
    <el-col :span="20">
      <div class="text">
        <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
          <el-tab-pane label="平台数据分析" name="first">


            <el-row>
              <el-col :span="8">

                <img src="@/assets/people.png" alt="">
                <p>机构备案数量</p>
                <p>2 <span>家</span></p>
              </el-col>
              <el-col :span="8"><img src="@/assets/ssss.png" alt="">
                <p>企业备案数量</p>
                <p>2 <span>家</span></p>
              </el-col>
              <el-col :span="8"><img src="@/assets/danger.png" alt="">
                <p>危险性场所数量</p>
                <p>2 <span>家</span></p>
              </el-col>
            </el-row>

          </el-tab-pane>


        </el-tabs>
      </div>
      <div class="textBottom">
        <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
          <el-tab-pane label="近7日在线执法近处理情况" name="first">

            <div id="echarts"></div>
          </el-tab-pane></el-tabs>
      </div>

    </el-col>
    <el-col :span="4">
      <div class="right">
        <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs">
          <el-tab-pane label="台账完成度排名" name="first">
            <ul>
              <li>
                <el-row>
                  <el-col :span="2">1</el-col>
                  <el-col :span="18">XX有限公司</el-col>
                  <el-col :span="4">100分</el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="2">2</el-col>
                  <el-col :span="18">XX有限公司</el-col>
                  <el-col :span="4">100分</el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="2">3</el-col>
                  <el-col :span="18">XX有限公司</el-col>
                  <el-col :span="4">100分</el-col>
                </el-row>
              </li>
            </ul>
          </el-tab-pane></el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from 'vue'
const activeName = ref('first')



onMounted(() => {
  echartsFun()
})
const echartsFun = () => {
  var chartDom = document.getElementById("echarts")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.row {
  margin-top: 10px;

  .text {
    padding: 0 10px;
    height: 150px;
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px #EBEBEB;
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
        color: #058FFEFF;
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
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px #EBEBEB;
    border-radius: 4px;

    #echarts {
      height: 300px;
      // background: #bfa;
    }
  }

  .right {
    padding: 0 10px;
    height: 500px;
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px #EBEBEB;
    border-radius: 4px;

  }
}
</style>