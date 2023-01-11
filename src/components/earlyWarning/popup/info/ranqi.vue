<template>
  <div id="ranqi">
    <el-dialog v-model="dialogVisible" title="设备详情" width="50%">
      <div
        v-loading="loading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(4, 19, 54)"
      >
        <el-button
          style="margin-bottom: 10px"
          @click="setTimeBtn"
          type="primary"
          >数据时间设置</el-button
        >
        <el-row>
          <el-col :span="8">
            <div class="one">
              <p>设备详情</p>
              <ul v-for="(item, index) in ElecDataList.Data" :key="index">
                <li><span> 所在地址:</span>{{ item.name }}</li>
                <li><span> 所在位置:</span>{{ item.installLocation }}</li>
                <li><span> 时间:</span>{{ item.heartbeatTime }}</li>
                <!-- <li>注册时间</li> -->
                <li><span>设备编号:</span> {{ item.productNumber }}</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="managementYes">
              <el-table
                height="200px"
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
                <el-table-column
                  prop="alarmFaultDate"
                  label="报警时间"
                  sortable
                >
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
          </el-col>
        </el-row>

        <div style="width: 100%">
          <div v-if="getGasInfoWapper.length >= 1" class="two">
            <p>实时值</p>
            <div class="gasDetectorWapper">
              <div v-for="(item, index) in getGasInfoWapper" :key="index">
                <div class="gasDetectorStyle">
                  <img
                    src="http://psy119.cn/lingdong1/static/img/gong_hong.f31152f6.png"
                    alt=""
                  />
                  <div class="fontColor">{{ item.gasvol }}%LEL</div>
                </div>
                <ul>
                  <li>{{ item.devNo }}探头状态: {{ item.state }}</li>
                  <li>{{ item.devNo }}探头气体类型: {{ item.gastype }}</li>
                  <li>
                    {{ item.devNo }}探头报警时间:
                    {{ item.sen_date }}
                  </li>
                  <li>探头地址:{{ item.address }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="two" v-if="HeartBeatList.length >= 1">
          <p>心跳时间</p>

          <el-table
            :data="HeartBeatList"
            style="width: 100%"
            height="320px"
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
            <el-table-column prop="gasvol" label="浓度(%LEL)" align="center">
            </el-table-column>
            <el-table-column prop="rssi" label="信号值" align="center">
            </el-table-column>
          </el-table>
        </div>

        <div class="two">
          <p>历史报警</p>
          <el-button
            style="margin-bottom: 10px"
            type="primary"
            @click="exportElx"
            >数据导出</el-button
          >
          <el-table
            height="300px"
            :data="ElecDataList.DevData"
            style="width: 100%"
            border
            :default-sort="{
              prop: 'alarmFaultDate',
              order: 'descending',
            }"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="typeName" label="报警类型" width="180">
            </el-table-column>
            <el-table-column prop="name" label="所属单位" width="180">
            </el-table-column>
            <el-table-column prop="installLocation" label="设备位置">
            </el-table-column>

            <el-table-column prop="alarmFaultDate" label="报警时间" sortable>
            </el-table-column>
          </el-table>
        </div>

        <div class="two">
          <p>设备事件</p>
          <el-table
            height="200"
            :data="getBluebirdevent_List"
            style="width: 100%"
            border
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="d_type" label="设备类型" width="180">
            </el-table-column>
            <el-table-column prop="desc" label="设备详情" width="180">
            </el-table-column>
            <el-table-column prop="dstr" label="设备标识"> </el-table-column>

            <el-table-column prop="alarmType" label="事件类型">
            </el-table-column>
            <el-table-column prop="date" label="事件时间"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  ElecData_type,
  getAlarmAndFault,
  WebeditFileimageServlet,
  getGasInfo,
  getHeartBea,
  getBluebirdevent,
  setHeartTime,
} from "@/api/index2";
import { ref, defineExpose, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const dialogVisible = ref(false);
const ElecDataList: any = ref(false);
const AlarmAndFaultList: any = ref(false);
const getGasInfoWapper: any = ref(false);
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
const userName = sessionStorage.getItem("userName");
onMounted(() => {});
const ElecData_typeFun = (devId: any, type: number) => {
  ElecData_type(devId, type).then((res) => {
    loading.value = false;
    if (res.data != "") {
      ElecDataList.value = res.data;
      getAlarmAndFaultFun();
      getGasInfoFun();
    }
  });
};
//导出elc表格
const exportElx = () => {
  // console.log(this.ElecDataList_type_List_DevInfo, 987987987);
  window.open(
    `http://psy119.cn/earlyWarn/admin/device/excelAlarmValue.action?imei=${ElecDataList.value.Data[0].productNumber}`
  );
};
const getGasInfoFun = () => {
  getGasInfo(ElecDataList.value.Data[0].productNumber).then((res) => {
    console.log(res, "wwwwwwwwwwwwwwww");
    getGasInfoWapper.value = res.data.data;
    getGasInfoWapper.value.sort((a, b) => {
      return a.devNo * 1 - b.devNo * 1;
    });
  });
  getHeartBea(ElecDataList.value.Data[0].productNumber).then((res) => {
    HeartBeatList.value = res.data.data;
  });
  getBluebirdevent(ElecDataList.value.Data[0].productNumber).then((res) => {});
};

const getAlarmAndFaultFun = () => {
  getAlarmAndFault(ElecDataList.value.Data[0].productNumber).then((res) => {
    AlarmAndFaultList.value = res.data.data;
  });
};
const setTimeBtn = () => {
  ElMessageBox.prompt("请输入设置的分钟数", "时间设置", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /\S/,

    inputErrorMessage: "时间不能为空",
  }).then(({ value }) => {
    setHeartTime(
      userName,
      ElecDataList.value.Data[0].productNumber,
      value
    ).then((res) => {
      ElMessage({
        type: "success",
        message: "设置成功",
        showClose: true,
      });
    });
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
const show = (devId: any, type: number) => {
  console.log("点击率");

  dialogVisible.value = true;
  loading.value = true;
  ElecData_typeFun(devId, type);
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
      // height: 200px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
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
      padding-bottom: 10px;
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
            border-right: 1px solid #999;
          }
        }
      }
    }
  }
}
</style>
