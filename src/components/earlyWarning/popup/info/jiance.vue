<template>
  <div id="jiance">
    <el-dialog
      v-model="dialogVisible"
      title="设备详情"
      width="60%"
      :before-close="handleClose"
    >
      <el-row>
        <el-button
          type="primary"
          @click="(dataVisible = true), Historical_alarm()"
          >历史报警</el-button
        >
        <el-button
          type="primary"
          @click="(dataVisible = true), getAlarmAndFaultFun()"
          >当前报警</el-button
        >
        <el-button type="primary" @click="exportData()">数据导出</el-button>
      </el-row>
      <br />
      <el-row>
        <el-col :span="6">
          <div class="shebeiInfo">
            <div class="one">
              <p class="titleP">设备信息</p>
              <ul v-for="(item, index) in ElecDataList.DevData" :key="index">
                <div
                  class="ulInfo"
                  style="background: #13d61c"
                  v-if="item.typeName == '正常' && item.status == '在线'"
                >
                  <p style="margin-top: 60px">设备正常/{{ item.status }}</p>
                </div>
                <div
                  class="ulInfo"
                  style="background: #999"
                  v-else-if="item.typeName == '正常' && item.status == '离线'"
                >
                  <p style="margin-top: 60px">设备正常/{{ item.status }}</p>
                </div>

                <div
                  class="ulInfo"
                  style="background: #eb8814"
                  v-else-if="item.typeName.indexOf('故障') > 0"
                >
                  <p style="margin-top: 50px">设备故障/{{ item.status }}</p>
                  <p>{{ item.level == "0" ? "" : item.level }}</p>
                </div>
                <div
                  v-if="item.typeName.indexOf('报警') >= 0"
                  style="background: #d61313"
                  class="ulInfo"
                >
                  <p style="margin-top: 60px">设备报警/{{ item.status }}</p>

                  <p>{{ item.level == "0" ? "" : item.level }}</p>
                </div>
                <li>
                  设备编号: <span>{{ item.productNumber }}</span>
                </li>
                <li>
                  设备状态: <span> {{ item.status }}</span>
                </li>
                <li>
                  报警手机: <span>{{ item.master }}</span>
                </li>
                <li>
                  报警信息:
                  <span v-if="item.typeName != '正常'" style="color: red">{{
                    item.typeName
                  }}</span>
                  <span v-else style="color: blue">{{ item.typeName }}</span>
                </li>
                <li>
                  最新数据:
                  <span v-if="item.typeName != '正常'" style="color: red">{{
                    item.newestDate
                  }}</span>
                  <span v-else style="color: blue">{{ item.newestDate }}</span>
                </li>

                <li>
                  保险单号:
                  <span>
                    {{
                      item.policy == "0" ? "暂无保险单号" : item.policy
                    }}</span
                  >
                </li>
                <li>
                  安装位置: <span>{{ item.installLocation }}</span>
                </li>
                <li>
                  安装日期: <span>{{ item.regdate }}</span>
                </li>
                <li>
                  开启流量:
                  <span>{{ item.flow == "0" ? "否" : "item.flow" }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="shebeiEcharts">
            <div class="one_echarts" style="margin-bottom: 20px; height: 220px">
              <p class="titleP">实时值</p>
              <el-row
                v-for="(item, index) in getDeviceByDevIdList.mess2"
                :key="index"
              >
                <el-col :span="12">
                  <div
                    style="
                      background: #1071e2;
                      height: 89px;
                      text-align: center;
                      border-radius: 0;
                      color: #fff;
                    "
                  >
                    <img src="../../../../assets/wenduji.png" alt="" />
                    <p>{{ item.value2 }}℃</p>
                  </div>
                  <ul>
                    <li>灭火器状态:正常</li>
                    <li>报警时间:无</li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <div
                    style="
                      background: #1071e2;
                      height: 89px;
                      text-align: center;
                      border-radius: 0;
                      color: #fff;
                    "
                  >
                    <img src="../../../../assets/shuidi.png" alt="" />
                    <p>{{ item.value1 }}%</p>
                  </div>
                  <ul>
                    <li>烟感状态:正常</li>
                    <li>报警时间:无</li>
                  </ul>
                </el-col>
              </el-row>
            </div>
            <div class="one_echarts">
              <p class="titleP">湿度统计图</p>
              <div id="echarts_wapper_one_search"></div>
            </div>
            <div class="two_echarts">
              <p class="titleP">温度统计图</p>
              <div id="echarts_wapper_two_search"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      v-model="dataVisible"
      :title="faultState ? '历史报警' : '当前报警'"
      width="50%"
    >
      <div v-if="faultState">
        <el-form
          size="mini"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="日期:">
            <el-col :span="24">
              <el-date-picker
                type="date"
                placeholder="时间"
                v-model="formInline.date1"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="Historical_alarm()"
              >查询</el-button
            >
            <!-- <el-button type="primary" @click="onSubmit">导出</el-button> -->
          </el-form-item>
        </el-form>
        <el-table
          height="400px"
          :data="Historical_alarm_list"
          style="width: 100%"
          v-loading="loading1"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(4, 19, 54)"
          :default-sort="{
            prop: 'regdate',
            order: 'descending',
          }"
        >
          <el-table-column prop="type" label="报警名称"> </el-table-column>
          <el-table-column prop="regdate" label="报警时间" sortable>
          </el-table-column>
          <el-table-column prop="leakageAlarmCurrentValue" label="报警值">
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-table
          height="400px"
          :data="AlarmAndFaultList"
          style="width: 100%"
          v-loading="loading1"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(4, 19, 54)"
          :default-sort="{
            prop: 'regdate',
            order: 'descending',
          }"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="typeName" label="报警名称"> </el-table-column>
          <el-table-column prop="alarmFaultDate" label="报警时间" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                @click="FaultHandleClick(scope.row.aFid)"
                type="text"
                size="small"
                >解除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  ElecData_type,
  getDeviceByDevId,
  fracture,
  getHistDeviceAlarm,
  WebeditFileimageServlet,
  getAlarmAndFault,
} from "@/api/index2";
import { ref, defineExpose, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import * as echarts from "echarts";
const dialogVisible = ref(false);
const dataVisible = ref(false);
const loading = ref(false);
const loading1 = ref(false);
const faultState = ref(false);
const Historical_alarm_list: any = ref([]);
const AlarmAndFaultList: any = ref([]);
const ElecDataList: any = ref(false);
const formInline = reactive({
  date1: "",
});
const getDeviceByDevIdList: any = ref(false);
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
const show = (devId: any, type: number) => {
  dialogVisible.value = true;
  loading.value = true;
  ElecData_typeFun(devId, type);
  getDeviceByDevIdFun(devId);
  echartsFun(devId);
};
const Historical_alarm = () => {
  loading1.value = true;
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  let now = year + "-" + month + "-" + day;
  if (formInline.date1 != "") {
    now = formInline.date1;
  }
  // console.log(this.sizeForm.date1, 987987);
  getHistDeviceAlarm(ElecDataList.value.DevData[0].productNumber, now).then(
    (res) => {
      loading1.value = false;
      // this.Historical_alarm_list_loading = false;
      if (res.data == "") {
        ElMessage({
          showClose: true,
          message: "暂无历史数据",
          type: "error",
        });
      }
      Historical_alarm_list.value = res.data.DevData;
    },
    () => {
      loading1.value = false;
      console.log(123);

      ElMessage({
        showClose: true,
        message: "请稍后重试或联系管理员",
        type: "error",
      });
      // ElMessage.error("请稍后重试或联系管理员");
    }
  );
};
const getDeviceByDevIdFun = (devId: any) => {
  getDeviceByDevId(devId).then((res) => {
    getDeviceByDevIdList.value = res.data.list[0];
  });
};
const handleClose = () => {
  var box2 = echarts.init(
    document.getElementById("echarts_wapper_two_search")!
  );
  box2.dispose();
  // type EChartsOption = echarts.EChartsOption;
  var box1 = echarts.init(
    document.getElementById("echarts_wapper_one_search")!
  );
  box1.dispose();

  dialogVisible.value = false;
};
const FaultHandleClick = (aFid) => {
  ElMessageBox.prompt("请填写处置情况", "解除报警", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    WebeditFileimageServlet(
      sessionStorage.getItem("userName") + "," + aFid,
      value
    ).then((res) => {
      // console.log(res.data);
      if (res.data == null || res.data == undefined || res.data == "") {
        return ElMessage({
          type: "error",
          message: "请稍后重试或联系管理员",
          showClose: true,
        });
      }
      if (res.data.list[0].status == true) {
        // this.innerVisible = false;
        // this.SmartIndependentSmokeDialog = false;
        getAlarmAndFaultFun();
        return ElMessage({
          type: "success",
          message: "解除报警成功",
          showClose: true,
        });
      }
    });
  });
};
const getAlarmAndFaultFun = () => {
  loading1.value = true;
  faultState.value = false;
  getAlarmAndFault(ElecDataList.value.DevData[0].productNumber).then((res) => {
    AlarmAndFaultList.value = res.data.data;
    loading1.value = false;
  });
};
const exportData = () => {
  window.open(
    `http://psy119.cn/earlyWarn/WebProject/PoiTemData?productNumber=${ElecDataList.value.DevData[0].productNumber}`
  );
};
const echartsFun = (devId: any) => {
  fracture(devId, sessionStorage.getItem("userName"), "", "").then((res) => {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById("echarts_wapper_one_search")!;
    var chartDom2 = document.getElementById("echarts_wapper_two_search")!;
    var myChart = echarts.init(chartDom);
    var myChart2 = echarts.init(chartDom2);

    let temp = [];
    let hum = [];
    let time = [];
    res.data.data.forEach((element) => {
      hum.push(element.hum);
      time.push(element.time);
      temp.push(element.temp);
    });

    myChart.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["湿度(%)"],
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
        data: time,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "湿度(%)",
          type: "line",

          data: hum,
        },
      ],
    });

    myChart2.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["温度(%)"],
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
        data: time,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "温度(%)",
          type: "line",

          data: temp,
        },
      ],
    });
  });
};
const ElecData_typeFun = (devId: any, type: number) => {
  ElecData_type(devId, type).then((res) => {
    // loading.value = false;
    if (res.data != "") {
      ElecDataList.value = res.data;

      loading.value = false;
    }
  });
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
#jiance {
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
    .shebeiInfo {
      .one {
        // width: 300px;
        color: #4b6082;
        padding-bottom: 10px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        span {
          color: #000;
        }
        .titleP {
          margin-left: 20px;
          line-height: 40px;
          font-weight: bold;
          // text-align: center;
        }
        ul {
          border-top: 1px solid #f3f6fa;
          padding-left: 20px;
          li {
            margin-top: 8px;
          }
        }
      }
      .two {
        margin-top: 20px;
        width: 300px;
        height: 250px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        // background: #bfa;
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          // text-align: center;
          border-bottom: 1px solid #f3f6fa;
        }
        /deep/.el-button--mini {
          margin: 10px 0 0 15px;
        }
      }
      .ulInfo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto;
        // line-height: 150px;
        padding: 1px;
        color: #fff;
        font-size: 20px;
      }
    }
    .shebeiEcharts {
      margin-left: 20px;

      // height: 212px;
      // background: #bfa;
      .imgWapper {
        height: 90px;
        text-align: center;
        background: #1071e2;
        div {
          // line-height: 90px;
          padding-top: 3px;
          p {
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        ul {
          margin-top: -10px;
          text-align: left;
          span {
            color: red;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .imgWapper_img {
          height: 90px;
          img {
            width: 35px;
            height: 35px;
          }
        }
      }
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        height: 212px;
        ul {
          margin-left: 15px;
          li {
            margin-top: 15px;
          }
        }
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
      .two_echarts {
        height: 340px;
        // background: #bfa;
        margin-top: 20px;
        box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        #echarts_wapper_two_search {
          width: 100%;
          height: 300px;
        }
      }
      .three_echarts {
        height: 340px;
        // background: #bfa;
        margin-top: 20px;
        box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        .echarts_wapper_three_search {
          // width: 100%;
          height: 300px;
        }
        .echarts_wapper_three_search_copy {
          // width: 100%;
          height: 300px;
        }
      }
      .four_echarts {
        height: 200px;
        // background: #bfa;
        margin-top: 20px;
        box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        .echarts_wapper_four_search {
          width: 100%;
          height: 160px;
        }
        .echarts_wapper_four_search_copy {
          width: 100%;
          height: 160px;
        }
      }
      .one_echarts {
        &:nth-child(1) {
          img {
            width: 44px;
            height: 48px;
          }
        }
        height: 340px;
        // background: #bfa;

        box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          border-bottom: 1px solid #f3f6fa;
          // text-align: center;
        }
        #echarts_wapper_one_search {
          width: 100%;
          height: 300px;
        }

        ul {
          text-align: center;
          padding: 15px 0 0 20px;
          li {
            margin-bottom: 10px;
          }
        }
        img {
          width: 16px;
          height: 34px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
