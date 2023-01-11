<template>
  <div id="shuiwei">
    <el-dialog v-model="dialogVisible" title="设备详情" width="50%">
      <div
        v-loading="loading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(4, 19, 54)"
      >
        <div class="FireWaterSystemDialogWapper">
          <p class="title">设备：{{ msg }}</p>

          <p class="title">设备号：{{ deviceid }}</p>

          <p class="title">更新时间：{{ time }}</p>
          <!-- 图表容器 -->
          <div id="shuiya_echarts"></div>
          <!-- <div class="shuiya_echarts"></div> -->

          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary" size="small">自诊断查询</el-button>
            </el-col>
            <el-col :span="6"
              ><el-button type="warning" size="small"
                >远程参数更新</el-button
              ></el-col
            >
            <el-col :span="6"
              ><el-button type="danger" size="small"
                >自主布撤防</el-button
              ></el-col
            >
            <el-col :span="6"
              ><el-button type="success" size="small"
                >固件升级</el-button
              ></el-col
            >
          </el-row>
        </div>
        <el-row style="width: 95%; margin: 0 auto">
          <el-col :span="24">
            <div
              class="right_two"
              v-for="(item, index) in ElecDataList.mess6"
              :key="index"
            >
              <el-row>
                <el-col :span="12" style="text-align: center">
                  <img
                    v-if="item.rssi == 1"
                    src="../../../../assets/one.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.rssi == 2"
                    src="../../../../assets/two.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.rssi == 3"
                    src="../../../../assets/three.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.rssi == 4"
                    src="../../../../assets/four.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else
                    src="../../../../assets/ling.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                </el-col>
                <el-col :span="12" style="text-align: center">
                  <img
                    v-if="item.voltage == 1"
                    src="../../../../assets/battery1.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.voltage == 2"
                    src="../../../../assets/battery2.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.voltage == 3"
                    src="../../../../assets/battery3.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else-if="item.voltage == 4"
                    src="../../../../assets/battery4.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                  <img
                    v-else
                    src="../../../../assets/battery0.png"
                    alt=""
                    style="width: 150px; height: 150px"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div
          class="shuju_echarts"
          style="height: 350px"
          v-if="AlarmAndFaultList.length >= 1"
        >
          <p>当前报警</p>
          <el-table
            height="300px"
            :data="AlarmAndFaultList"
            style="width: 100%"
            :default-sort="{
              prop: 'regdate',
              order: 'descending',
            }"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="typeName" label="报警名称">
            </el-table-column>
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
        <div
          class="shuju_echarts"
          style="height: 350px"
          v-if="HeartBeatList.length >= 1"
        >
          <p>心跳时间</p>

          <el-table
            :data="HeartBeatList"
            style="width: 100%"
            height="300px"
            :default-sort="{
              prop: 'heartBeat',
              order: 'descending',
            }"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="heartBeat"
              sortable
              label="时间"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="shuju_echarts">
          <p>设备最近数据分析</p>
          <div id="shuju_echarts_wapper"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  getAlarmAndFault,
  ElecData_type,
  WebeditFileimageServlet,
  getHeartBea,
  getHistoryPress_value,
} from "@/api/index2";
import { ref, defineExpose } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import "echarts-liquidfill";
import * as echarts from "echarts";
const userName = sessionStorage.getItem("userName");
const dialogVisible = ref(false);
const AlarmAndFaultList = ref([]);
const ElecDataList: any = ref([]);
const HeartBeatList: any = ref(false);
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
const show = (devId: any, type: number, dSid: string) => {
  dialogVisible.value = true;
  loading.value = true;
  ElecData_typeFun(devId, type, dSid);
};
const ElecData_typeFun = (devId: any, type: number, dSid: string) => {
  ElecData_type(devId, type).then((res) => {
    loading.value = false;
    if (res.data != "") {
      ElecDataList.value = res.data;
      getAlarmAndFaultFun();
      echatsFun(dSid);

      type EChartsOption = echarts.EChartsOption;

      var chartDom = document.getElementById("shuiya_echarts")!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      if (dSid == "4") {
        let max = 1000;
        let name = "kpa";

        myChart.setOption({
          // tooltip: {
          //   formatter: "{a} <br/>{b} : {c}m",
          // },

          series: [
            {
              // name: "业务指标",
              type: "gauge",
              min: 0,
              max: max,
              detail: { formatter: `{value}${name}` },
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0.2, "#91c7ae"],
                    [0.8, "#63869e"],
                    [1, "#c23531"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              data: [{ value: res.data.mess6[0].Press_Value }],
            },
          ],
        });
      } else {
        myChart.setOption({
          series: [
            {
              type: "liquidFill",
              radius: "200px",
              data: [res.data.mess6[0].Press_Value * 0.01 * 10],
              label: {
                normal: {
                  color: "#000",
                  // insideColor: "transparent",
                  textStyle: {
                    fontSize: 30,
                    fontWeight: "bold",
                  },
                  formatter: `${res.data.mess6[0].Press_Value * 1}m`,
                },
              },
              // backgroundStyle: {
              //   borderWidth: 5, //内边框宽度
              //   borderColor: "yellow", //背景内边框
              //   color: "white", //背景颜色
              //   shadowColor: "red", //阴影
              //   shadowBlur: 10, //阴影模糊
              // },

              color: [
                {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 1,
                      color: ["#6a7feb"], // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: ["#27e5f1"], // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              ],
              outline: {
                show: true,
                borderDistance: 5,
                itemStyle: {
                  borderColor: "rgb(101,143,236)",
                  // borderWidth: 0,
                },
                // itemStyle: {
                //   borderWidth: 5,
                //   borderColor: "yellow",
                //   shadowBlur: 10,
                //   shadowColor: "red",
                // },
              },
            },
          ],
        });
      }
    }
  });
};
const FaultHandleClick = (aFid: string) => {
  ElMessageBox.prompt("请填写处置情况", "解除报警", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    WebeditFileimageServlet(userName + "," + aFid, value).then((res) => {
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
  getAlarmAndFault(ElecDataList.value.DevData[0].deviceid).then((res) => {
    AlarmAndFaultList.value = res.data.data;
  });
  getHeartBea(ElecDataList.value.DevData[0].deviceid).then((res) => {
    HeartBeatList.value = res.data.data;
  });
};
const echatsFun = (dSid: string) => {
  let data = [];
  let value = [];
  getHistoryPress_value(ElecDataList.value.DevData[0].deviceid).then((res) => {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById("shuju_echarts_wapper")!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    res.data.data.forEach((el, index) => {
      data.push(el.create_time);
      value.push(el.press_Value);

      console.log(dSid, "disd");

      myChart.setOption({
        xAxis: {
          type: "category",
          data,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000",
            },
            formatter: dSid == "4" ? "{value}kpa" : "{value}m",
          },
        },
        series: [
          {
            data: value,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "red",
                },
              },
            },
          },
        ],
      });
    });
  });
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
#shuiwei {
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
    .FireWaterSystemDialogWapper {
      width: 500px;
      margin: 0 auto;
      .title {
        text-align: center;
      }
      #shuiya_echarts {
        // width: 400px;
        height: 400px;
        margin: 0 auto;
        // background: #bfa;
      }

      .yeya_echarts {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        // background: #bfa;
      }
      .el-button--small {
        width: 120px;
      }
    }
    .shuju_echarts {
      width: 95%;
      height: 450px;
      margin: 0 auto;
      // background: #bfa;
      margin-top: 20px;

      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      p {
        line-height: 20px;
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #eaeaea;
      }
      #shuju_echarts_wapper {
        // width: 90%;
        height: 410px;
        // margin: 0 auto;
        // background: #bfa;
        // margin-top: 30px;
      }
    }
  }
}
</style>
