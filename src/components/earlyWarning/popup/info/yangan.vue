<template>
  <div id="yangan">
    <el-dialog v-model="dialogVisible" :title="typeName" width="60%" center>
      <el-row :gutter="20" class="SmartIndependentSmoke_right_wapper" v-loading="loading"
        element-loading-text="Loading..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(4, 19, 54)">
        <el-col :span="6">
          <!-- <el-row :gutter="20">
            <el-col :span="12">
              <el-button style="width: 100%; margin-bottom: 10px" type="primary" @click="infrared(2)">消音</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="width: 100%; margin-bottom: 10px" type="primary" @click="infrared(3)">复位</el-button>
            </el-col>
          </el-row>
          <el-button type="primary" style="width: 100%; margin-bottom: 20px"
            @click="infraredVisible = true">红外模式时间设置</el-button>
          <el-dialog v-model="infraredVisible" title="Tips" width="20%">
            <el-time-picker is-range v-model="infraredTime" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" placeholder="选择时间范围" value-format="HH:mm">
            </el-time-picker>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="infraredVisible = false">取消</el-button>
                <el-button type="primary" @click="(infraredVisible = false), infrared(1)">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog> -->

          <div class="rihgt_one">
            <p class="titleP">设备信息</p>
            <ul>
              <li><span>设备编号:</span> {{ infoData.productNumber }}</li>
              <li>
                <span> 最新数据:</span>{{ infoData.heartbeatTime }}
              </li>

              <li><span> 所在地址:</span>{{ infoData.installLocation }}</li>
              <li><span>创建时间:</span> {{ infoData.regdate }}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="right_two" v-for="(item, index) in deviceData" :key="index">
            <el-row>
              <el-col :span="12">
                <img v-if="item.csq <= 8" src="../../../../assets/one.png" alt="" />
                <img v-else-if="item.csq <= 16" src="../../../../assets/two.png" alt="" />
                <img v-else-if="item.csq <= 24" src="../../../../assets/three.png" alt="" />
                <img v-else-if="item.csq <= 32" src="../../../../assets/four.png" alt="" />
                <img v-else src="../../../../assets/ling.png" alt="" />
              </el-col>
              <el-col :span="12" v-if="item.electric == 0">
                <img v-if="item.voltage <= 0.8" src="../../../../assets/battery1.png" alt="" />
                <img v-else-if="item.voltage <= 1.6" src="../../../../assets/battery2.png" alt="" />
                <img v-else-if="item.voltage <= 2.4" src="../../../../assets/battery3.png" alt="" />
                <img v-else-if="item.voltage <= 3.2" src="../../../../assets/battery4.png" alt="" />
                <img v-else src="../../../../assets/battery0.png" alt="" />
              </el-col>
              <el-col :span="12" v-else>
                <img v-if="item.electric <= 25" src="../../../../assets/battery1.png" alt="" />
                <img v-else-if="item.electric <= 50" src="../../../../assets/battery2.png" alt="" />
                <img v-else-if="item.electric <= 75" src="../../../../assets/battery3.png" alt="" />
                <img v-else-if="item.electric <= 100" src="../../../../assets/battery4.png" alt="" />
                <img v-else src="../../../../assets/battery0.png" alt="" />
              </el-col>
            </el-row>
          </div>
          <!-- <div class="SmartIndependentSmoke_echars_one" v-if="infoState">
            <p class="titleP">信号强度/温度统计图</p>
            <div id="SmartIndependentSmoke_echars_one_wapper"></div>
          </div>
          <div class="SmartIndependentSmoke_echars_one">
            <p class="titleP">心跳时间</p>

            <div>
              <el-table border :data="HeartBeatList" style="width: 100%" height="300px" :default-sort="{
                prop: 'heartBeat',
                order: 'descending',
              }">
                <el-table-column type="index" label="序号" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="heartBeat" sortable label="时间" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div> -->
          <div class="SmartIndependentSmoke_echars_one">
            <p class="titleP">当前报警</p>
            <el-table height="300px" :data="AlarmAndFaultList" style="width: 100%" :default-sort="{
              prop: 'regdate',
              order: 'descending',
            }">
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column prop="alarm_name" label="报警名称">
              </el-table-column>
              <el-table-column prop="alarm_date" label="报警时间" sortable>
              </el-table-column>
              <!-- <el-table-column label="操作">
                <template #default="scope">
                  <el-button @click="FaultHandleClick(scope.row.aFid)" type="text" size="small">解除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="SmartIndependentSmoke_echars_one">
            <p class="titleP">历史报警</p>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:10px">
              <el-form-item label="时间选择">
                <el-date-picker v-model="formInline.time" type="datetimerange" range-separator="To"
                  start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY/MM/DD HH:mm:ss" />
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

          <!-- <div class="lishibaojing" style="height: 200px">
            <p class="titleP">图片</p>
            <el-row :gutter="50">
            
              <el-col :span="8" v-for="(item, index) in ElecDataList_images" :key="index">
                <div>
                  <el-image style="width: 100%; height: 150px" :src="item" :preview-src-list="ElecDataList_images">
                  </el-image>
                </div>
              </el-col>
            </el-row>
          </div> -->
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import {
  getDevInfoByDevId,
  getHistoryAlarm
} from "@/api/index";
import { ref, defineExpose, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import Pagination from "../../../pagination/index.vue";
// const userName = sessionStorage.getItem("userName");
const dialogVisible = ref(false);
// const infraredVisible = ref(false);
const historyData: any = ref([]);
const formInline = reactive({
  time: []
})

const total = ref(0);
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const productNumber = ref()
const typeName = ref('')
const AlarmAndFaultList: any = ref([]);
const infoData: any = ref({});
const deviceData: any = ref({});
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

// const getYGTempFun = () => {
//   getYGTemp(ElecDataList.value.DevData[0].productNumber).then((res) => {
//     let rouselt = res.data.data;
//     if (rouselt.length == 0) {
//       return (infoState.value = false);
//     }
//     let rssi: any = [];
//     let create_time: any = [];
//     let temperature: any = [];
//     type EChartsOption = echarts.EChartsOption;
//     var chartDom = document.getElementById(
//       "SmartIndependentSmoke_echars_one_wapper"
//     )!;
//     var myChart = echarts.init(chartDom);
//     var option: EChartsOption;
//     rouselt.forEach((element: any, index: any) => {
//       //console.log(element.rssi);
//       rssi.push(element.rssi);
//       create_time.push(element.create_time);
//       temperature.push(element.temperature);
//     });
//     option = {
//       tooltip: {
//         trigger: "axis",
//       },
//       legend: {
//         data: ["信号强度", "温度"],
//       },
//       grid: {
//         left: "3%",
//         right: "4%",
//         bottom: "3%",
//         containLabel: true,
//       },
//       toolbox: {
//         feature: {
//           saveAsImage: {},
//         },
//       },
//       xAxis: {
//         type: "category",
//         boundaryGap: false,
//         data: create_time.reverse(),
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: [
//         {
//           name: "信号强度",
//           type: "line",

//           data: rssi.reverse(),
//         },
//         {
//           name: "温度",
//           type: "line",

//           data: temperature.reverse(),
//         },
//       ],
//     };

//     myChart.setOption(option);
//   });
// };
//红外线模式
// const infrared = (type: any) => {
//   // this.infraredVisible = false;
//   // console.log(
//   //   this.ElecDataList_noIndexOf.DevData[0].productNumber,
//   //   this.infraredTime
//   // );
//   setTime(
//     userName,
//     ElecDataList.value.DevData[0].productNumber,
//     type,
//     infraredTime.value[0],
//     infraredTime.value[1]
//   ).then(
//     (res) => {
//       //
//       if (res.data.code == 200) {
//         ElMessage({
//           showClose: true,
//           type: "success",
//           message: "设置成功",
//         });
//       } else {
//         ElMessage({
//           showClose: true,
//           type: "error",
//           message: "请稍后重试或联系管理员",
//         });
//       }
//     },
//     (rej) => {
//       ElMessage({
//         showClose: true,
//         type: "error",
//         message: "请稍后重试或联系管理员",
//       });
//     }
//   );
// };
// const FaultHandleClick = (aFid: string) => {
//   ElMessageBox.prompt("请填写处置情况", "解除报警", {
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//   }).then(({ value }) => {
//     WebeditFileimageServlet(userName + "," + aFid, value).then((res) => {
//       // console.log(res.data);
//       if (res.data == null || res.data == undefined || res.data == "") {
//         return ElMessage({
//           type: "error",
//           message: "请稍后重试或联系管理员",
//           showClose: true,
//         });
//       }
//       if (res.data.list[0].status == true) {
//         // this.innerVisible = false;
//         // this.SmartIndependentSmokeDialog = false;
//         getAlarmAndFaultFun();
//         return ElMessage({
//           type: "success",
//           message: "解除报警成功",
//           showClose: true,
//         });
//       }
//     });
//   });
// };
// const getAlarmAndFaultFun = () => {
//   getAlarmAndFault(ElecDataList.value.DevData[0].productNumber).then((res) => {
//     AlarmAndFaultList.value = res.data.data;
//   });
// };
// const getHeartBeaFun = () => {
//   getHeartBea(ElecDataList.value.DevData[0].productNumber).then((res: any) => {
//     HeartBeatList.value = res.data.data;
//     console.log(HeartBeatList);
//   });
// };

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

const show = (devId: any, imei: number, type_name: String) => {
  productNumber.value = imei
  dialogVisible.value = true;
  loading.value = false;
  typeName.value = `${type_name}设备详情`
  // ElecData_typeFun(devId, type);
  getDevInfoByDevId(devId).then(res => {
    infoData.value = res.data.data.deviceBaseInfo
    deviceData.value = [res.data.data.deviceData]
    AlarmAndFaultList.value = res.data.data.devWarnInfo
    // deviceData.value = 
    // let message = {
    //   rssi: res.data.data.deviceData.csq,
    //   voltage: res.data.data.deviceData.electric==0? res.data.data.deviceData.voltage/4


    // }
  })


  // console.log(formInline.time);


};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}

#yangan {
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

    .SmartIndependentSmoke_right_wapper {
      .rihgt_one {
        // height: 160px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        padding: 10px;

        // background: #bfa;
        .titleP {
          // padding-left: 20px;
          line-height: 40px;
          // text-align: center;
          border-bottom: 1px solid #f3f6fa;
        }

        ul {
          // border-top: 1px solid #f3f6fa;
          // padding-left: 20px;

          li {
            margin-top: 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            span {
              color: #4b6082;
              width: 70px;
              display: inline-block;
            }
          }
        }
      }

      .right_two {
        height: 160px;
        box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
        text-align: center;

        // background: #bfa;
        .titleP {
          padding-left: 20px;
          line-height: 40px;
          // text-align: center;
          border-bottom: 1px solid #f3f6fa;
        }

        img {
          // margin: 12px 70px;
          margin-top: 10px;
          width: 33%;
          height: 90%;
        }
      }
    }

    .SmartIndependentSmoke_echars_one {
      margin-top: 20px;
      // height: 340px;`s
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);

      .titleP {
        padding-left: 20px;
        line-height: 40px;
        font-weight: 900;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }

      #SmartIndependentSmoke_echars_one_wapper {
        height: 300px;
      }
    }

    .lishibaojing {
      margin-top: 20px;
      height: 340px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);

      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }

      .formList {
        padding-left: 20px;
      }
    }
  }
}
</style>
