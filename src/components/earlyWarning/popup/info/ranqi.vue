<template>
  <div id="ranqi">
    <el-dialog v-model="dialogVisible" :title="typeName" width="50%" center>
      <div v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(4, 19, 54)">
        <el-button style="margin-bottom: 10px" @click="setTimeBtn" v-if="dSid == '26'" type="primary">分贝阀值设置</el-button>
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="one">
              <p>设备详情</p>
              <ul v-for="(item, index) in infoData" :key="index">
                <li><span> 创建时间:</span>{{ item.regdate }}</li>
                <li><span> 所在位置:</span>{{ item.installLocation }}</li>
                <li><span> 最新数据:</span>{{ item.heartbeatTime }}</li>
                <li><span> 设备状态:</span>{{ item.alarmType == 0 ? '正常' : '报警' }}</li>
                <!-- <li>注册时间</li> -->
                <li><span>设备编号:</span> {{ item.productNumber }}</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row v-if="dSid == '26'">
              <el-col :span="12">
                <div class="managementYes" v-for="(item, index) in infoData" :key="index">
                  <div class="status" :style="item.alarmType == 1 ? 'background:red' : 'background: #13d61c'">
                    {{ item.alarmType == 0 ? '正常' : '报警' }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="managementYes" v-for="(item, index) in infoData" :key="index">
                  <div class="status" :style="item.alarmType == 1 ? 'background:red' : 'background: #13d61c'">
                    {{ deviceData.noise }}db
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="managementYes" v-for="(item, index) in infoData" :key="index" v-else>
              <div class="status" :style="item.alarmType == 1 ? 'background:red' : 'background: #13d61c'">
                {{ item.alarmType == 0 ? '正常' : '报警' }}
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="two">
          <p>
            当前报警
          </p>

          <el-table height="200px" :data="AlarmAndFaultList" style="width: 100%" :default-sort="{
            prop: 'regdate',
            order: 'descending',
          }">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="alarm_name" label="当前报警类型">
            </el-table-column>
            <el-table-column prop="alarm_value" label="报警阀值" v-if="dSid == 26">
            </el-table-column>
            <el-table-column prop="alarm_date" label="当前报警时间" sortable>
            </el-table-column>
          </el-table>

        </div>
        <div class="one_echarts" v-if="dSid == '26'">
          <p class="titleP">分贝统计图</p>
          <div id="echarts_wapper_one_search"></div>
        </div>
        <div style="width: 100%">
          <div v-if="getGasInfoWapper.length >= 1" class="two">
            <p>实时值</p>
            <div class="gasDetectorWapper">
              <div v-for="(item, index) in getGasInfoWapper" :key="index">
                <div class="gasDetectorStyle">
                  <img src="http://psy119.cn/lingdong1/static/img/gong_hong.f31152f6.png" alt="" />
                  <div class="fontColor">{{ item.gasvol }}%LEL</div>
                </div>
                <ul>
                  <li>{{ item.devNo }}探头</li>
                  <li>{{ item.devNo }}探头气体类型: {{ item.gastype }}</li>
                  <li>
                    {{ item.devNo }}探头最新数据:
                    {{ item.heartbeatTime }}
                  </li>
                  <!-- <li>探头地址:{{ item.address }}</li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>



        <div class="two">
          <p>历史报警</p>
          <!-- <el-button style="margin-bottom: 10px" type="primary" @click="exportElx">数据导出</el-button> -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:10px">
            <el-form-item label="时间选择">
              <el-date-picker v-model="formInline.time" type="datetimerange" range-separator="To" start-placeholder="开始时间"
                end-placeholder="结束时间" value-format="YYYY/MM/DD HH:mm:ss" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="historySearch">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table height="300px" :data="historyData" style="width: 100%" :default-sort="{
            prop: 'alarmFaultDate',
            order: 'descending',
          }">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="alarm_name" label="报警类型">
            </el-table-column>
            <el-table-column prop="alarm_date" label="报警时间" sortable>
            </el-table-column>
          </el-table>
          <Pagination :total="total" @changeList="changeList" />
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  getDevInfoByDevId,
  getHistoryAlarm,
  viewDeviceGraphs,
  setParam
} from "@/api/index";
import moment from 'moment'
import * as echarts from "echarts";
import { ref, defineExpose, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import Pagination from "../../../pagination/index.vue";
import { DishDot } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const typeName = ref('');
const dSid = ref('');
const deviceData = ref({});
const total = ref(0);
const pageSize4 = ref(10)
const formInline = reactive({
  time: []
})
const currentPage4 = ref(1)
const productNumber: any = ref();
const AlarmAndFaultList: any = ref(false);
const getGasInfoWapper = ref([]);
const infoData: any = ref([]);
const historyData: any = ref([]);
const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
// const userName = sessionStorage.getItem("userName");

const show = (devId: any, imei: Number, type_name: String) => {
  console.log("点击率");
  typeName.value = `${type_name}设备详情`
  dialogVisible.value = true;
  loading.value = false;
  productNumber.value = imei
  getDevInfoByDevId(devId).then(res => {
    infoData.value = [res.data.data.deviceBaseInfo]
    AlarmAndFaultList.value = res.data.data.devWarnInfo
    deviceData.value = res.data.data.deviceData
    getGasInfoWapper.value = []
    dSid.value = res.data.data.deviceBaseInfo.type
    if (res.data.data.deviceBaseInfo.type == 20) {
      getGasInfoWapper.value.push({
        'gasvol': res.data.data.deviceData.gasvol,
        'devNo': res.data.data.deviceData.devidNo,
        'gastype': res.data.data.deviceData.gastype,
        'heartbeatTime': res.data.data.deviceData.heartbeatTime,
      })
    }
  })
  viewDeviceGraphs(imei, moment().subtract(1, 'day').format('YYYY/MM/DD HH:mm:ss'), moment().format('YYYY/MM/DD HH:mm:ss')).then(res => {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById("echarts_wapper_one_search")!;
    var myChart = echarts.init(chartDom);

    let info = []
    let time = []
    res.data.data.forEach((element: any) => {
      info.push(element.noise)
      time.push(element.heartbeatTime)
    })
    // option3 = ;
    myChart.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["A电压(V)", "B电压(V)", "C电压(V)"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: time.reverse(),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "分贝(db)",
          type: "line",
          // stack: "总量",
          data: info.reverse(),
        },

      ],
    });
  })
};
const setTimeBtn = () => {
  ElMessageBox.prompt('请输入要设置的分贝', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',

  })
    .then(({ value }) => {
      setParam(
        productNumber.value,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        value
      ).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: `设置成功`,
            showClose: true
          })
        }
      })

    })


}
const historySearch = () => {
  getHistoryAlarm(productNumber.value, formInline.time[0], formInline.time[1], currentPage4.value, pageSize4.value).then(res => {
    historyData.value = res.data.data
    total.value = res.data.dataCount
    if (res.data.dataCount == 0) {
      ElMessage({
        message: '暂无历史报警',
        showClose: true,
        type: 'error'

      })
    }
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
  // getCompDeviceListFun();
  historySearch()
};

defineExpose({
  show,
});
</script>
<style scoped lang="less">
#ranqi {
  /deep/.el-dialog {
    .el-dialog__header {
      margin-right: 0;
      background: #1071e2;

      .el-dialog__title {
        color: #fff;
      }
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    .one {
      width: 300px;
      height: 200px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);

      p {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }

      ul {
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;

        li {
          margin-top: 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: blue;

          span {
            display: inline-block;
            width: 70px;
            color: #4b6082;
          }
        }
      }
    }

    .managementYes {
      // margin-top: 20px;

      // padding-bottom: 20px;
      height: 200px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      padding-top: 1px;

      .status {
        width: 150px;
        height: 150px;
        margin: 0 auto;
        background: #bfa;
        border-radius: 50%;
        margin-top: 25px;
        text-align: center;
        line-height: 150px;
        color: #fff;
        font-size: 30px;
      }

      p {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }
    }

    .two {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      margin-top: 10px;
      padding-bottom: 50px;
      position: relative;

      p {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }

      .gasDetectorWapper {
        // overflow-x: auto;
        // overflow-y: hidden;

        // white-space: nowrap;
        flex-wrap: wrap;

        // word-break: normal;
        display: flex;

        // width: 610px;
        .gasDetectorStyle {
          background: #1071e2;
          width: 305px;
          height: 75px;
          text-align: center;

          img {
            width: 50px;
            height: 50px;
          }

          .fontColor {
            color: #fff;
          }

          ul {
            padding: 10px;
            border-right: 1px solid #999;
          }
        }
      }
    }

    .one_echarts {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      height: 340px;
      margin-top: 10px;

      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        font-weight: bold;
        border-bottom: 1px solid #f3f6fa;
      }

      #echarts_wapper_one_search {
        height: 300px;
        // background: #4b6082;
      }

      // #echarts_wapper_two_search {
      //   height: 300px;
      //   // background: #4b6082;
      // }

      // #echarts_wapper_three_search {
      //   height: 300px;
      //   // background: #4b6082;
      // }
    }
  }
}
</style>
