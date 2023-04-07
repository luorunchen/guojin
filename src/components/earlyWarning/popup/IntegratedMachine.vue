<template>
  <el-dialog v-model="centerDialogVisible" title="设备详情" width="70%" center>


    <div class="demo-tabs">
      <h3>设备信息</h3>

      <el-descriptions :column="3" border>
        <el-descriptions-item label="设备号">{{ deviceBaseInfo.productNumber }}</el-descriptions-item>
        <el-descriptions-item label="安装位置">{{ deviceBaseInfo.installLocation }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{ deviceBaseInfo.type_name }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ deviceBaseInfo.device_name }}</el-descriptions-item>
        <el-descriptions-item label="所属公司">{{ deviceBaseInfo.company }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ deviceBaseInfo.regdate }}</el-descriptions-item>
        <el-descriptions-item label="远程控制">

          <el-button type='success' @click="switchChang(1)">远程开机</el-button>
          <el-button type='danger' @click="switchChang(2)">远程解锁</el-button>
        </el-descriptions-item>

      </el-descriptions>

      <h3>设备状态 <el-button type="primary" @click="historyAlarmFun">历史报警
        </el-button></h3>
      <div class="typeBox">
        <!-- <div class="devicesType" :style="devStateInfoInfo.switchs == 0 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>运行状态</p>
          <p :style="devStateInfoInfo.switchs == 0 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.switchs == 0 ? '开机' : '关机' }}
          </p>
        </div> -->
        <div class="devicesType" :style="devStateInfoInfo.io0 == 1 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>水泵</p>
          <p :style="devStateInfoInfo.io0 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io0 == 1 ? '正常' : '报警' }}
          </p>
        </div>
        <div class="devicesType" :style="devStateInfoInfo.io1 == 1 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>风机</p>
          <p :style="devStateInfoInfo.io1 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io1 == 1 ? '正常' : '报警' }}
          </p>
        </div>
        <div class="devicesType" :style="devStateInfoInfo.io2 == 1 ? 'background:#dcefff' : 'background:#FAEFEB'">
          <p>抛光机电机</p>
          <p :style="devStateInfoInfo.io2 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io2 == 1 ? '正常' : '报警' }}
          </p>
        </div>
        <div class="devicesType" :style="devStateInfoInfo.io3 == 1 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>水位</p>
          <p :style="devStateInfoInfo.io3 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io3 == 1 ? '正常' : '报警' }}
          </p>
        </div>
        <div class="devicesType" :style="devStateInfoInfo.io4 == 1 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>流量</p>
          <p :style="devStateInfoInfo.io4 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io4 == 1 ? '正常' : '报警' }}
          </p>
        </div>
        <div class="devicesType" :style="devStateInfoInfo.io4 == 1 ? 'background:#EBFAF2' : 'background:#FAEFEB'">
          <p>氢气浓度</p>
          <p :style="devStateInfoInfo.io5 == 1 ? 'color:#49C988' : 'color:red'">
            {{ devStateInfoInfo.io5 == 1 ? '正常' : '报警' }}
          </p>
        </div>

      </div>
      <h3>流量统计图</h3>
      <div id="echatsBox"></div>

    </div>


    <el-dialog v-model="dialogVisible" title="历史报警" width="50%" center>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="时间选择">
          <el-date-picker v-model="formInline.time" type="datetimerange" range-separator="To" start-placeholder="开始时间"
            end-placeholder="结束时间" value-format="YYYY/MM/DD HH:mm:ss" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="historySearch">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe style="width: 100%;margin-bottom: 30px;" height="300px">
        <el-table-column type="index" />
        <el-table-column prop="alarm_date" label="报警时间" />
        <el-table-column prop="alarm_name" label="报警名称" />
      </el-table>
      <Pagination :total="total" @changeList="changeList" />
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>
    <el-dialog v-model="removeVisible" title="当前报警" width="50%" center>
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="时间选择">
          <el-date-picker v-model="formInline.time" type="datetimerange" range-separator="To" start-placeholder="开始时间"
            end-placeholder="结束时间" value-format="YYYY/MM/DD HH:mm:ss" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="historySearch">查询</el-button>
        </el-form-item>
      </el-form> -->

      <el-table :data="devWarnInfo" stripe style="width: 100%;margin-bottom: 30px;" height="300px">
        <el-table-column type="index" />
        <el-table-column prop="alarm_date" label="报警时间" />
        <el-table-column prop="alarm_name" label="报警名称" />
        <el-table-column prop="alarm_name" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="removeAlarmFun(scope.row.afid, scope.$index)">解除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" @changeList="changeList" />
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>
    <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
  </el-dialog>
  <RemoveAlarm ref="removeAlarm" @getAlarmStatus="getAlarmStatus" />
</template>

<script lang="ts" setup>
import { ref, defineExpose, onMounted, nextTick, reactive } from 'vue'

import { getDevInfoByDevId, remoteControlDev, viewDeviceGraphs, getHistoryAlarm } from '@/api/index.js'
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
import moment from 'moment'
import Pagination from "../../pagination/index.vue";
import RemoveAlarm from './removeAlarm.vue';
const centerDialogVisible = ref(false)
const dialogVisible = ref(false)
const removeVisible = ref(false)
const switchValue = ref(false)
const loading = ref(false)
const devIdInfo = ref()
const removeAlarm = ref(null)
const deviceBaseInfo: any = ref({})
const devStateInfoInfo: any = ref({})
const total = ref(0)
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const tableData = ref([])
const devWarnInfo = ref([])


const formInline = reactive({
  time: []
})

onMounted(() => {

})
const switchChang = (val) => {


  remoteControlDev(deviceBaseInfo.value.productNumber, deviceBaseInfo.value.type, val, 0).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: '设置成功',
        type: 'success'
      })
    }
  })
}
const historySearch = () => {
  getHistoryAlarm(deviceBaseInfo.value.productNumber, formInline.time[0], formInline.time[1], currentPage4.value, pageSize4.value).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })
  // console.log(formInline.time);

}
const echarFun = () => {
  console.log(123);

  nextTick(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echatsBox'));
    console.log(deviceBaseInfo.value, 'devices');

    viewDeviceGraphs(deviceBaseInfo.value.productNumber, moment().subtract(1, 'day').format('YYYY/MM/DD HH:mm:ss'), moment().format('YYYY/MM/DD HH:mm:ss')).then(res => {

      let time = []
      let rtflow = []
      let rtspeed = []
      res.data.data.forEach(item => {
        time.push(item.heartbeatTime)
        rtflow.push(item.rtflow)
        rtspeed.push(item.rtspeed)
      })
      // 绘制图表
      myChart.setOption({
        legend: {
          data: ['实时流量(m³/h)', '实时流速(m/s)']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '实时流量(m³/h)',
            data: rtflow,
            type: 'line',
            smooth: true
          },
          {
            name: '实时流速(m/s)',
            data: rtspeed,
            type: 'line',
            smooth: true
          }
        ]
      });
    })


  })

}
const getAlarmStatus = (status) => {
  console.log(status, '子组件传回');
  removeVisible.value = false
  // devWarnInfo.value.splice(status, 1)
  getDevInfoByDevIdFun(devIdInfo.value)
  // remoteControlDev(deviceBaseInfo.value.productNumber, deviceBaseInfo.value.type, 1).then(res => {
  //   // if (res.data.code == 200) {
  //   //   ElMessage({
  //   //     showClose: true,
  //   //     message: '设置成功',
  //   //     type: 'success'
  //   //   })
  //   // }
  // })
}
const removeAlarmFun = (afid, index) => {
  removeAlarm.value.show(afid, index)
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
  // getCompDeviceListFun();
};
const show = (devId) => {
  centerDialogVisible.value = true
  getDevInfoByDevIdFun(devId)

}
const historyAlarmFun = () => {
  dialogVisible.value = true
  // historySearch()
}
const getDevInfoByDevIdFun = (devId) => {
  getDevInfoByDevId(devId).then(res => {
    console.log(res.data.data.deviceBaseInfo, '122');
    devIdInfo.value = devId
    deviceBaseInfo.value = res.data.data.deviceBaseInfo
    devStateInfoInfo.value = res.data.data.devStateInfo
    devWarnInfo.value = res.data.data.devWarnInfo
    devStateInfoInfo.switchs == 0 ? switchValue.value = false : switchValue.value = true
    echarFun()
  })
}
defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.demo-tabs {
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  padding: 10px;

  h3 {
    clear: both;
    border-bottom: 1px solid #eff1f4;
    border-left: 4px solid #0165d0;
    padding-left: 20px;
    margin-bottom: 10px;
    margin-top: 30px;
    color: #000;

    &:nth-child(1) {
      margin-top: 0;
    }
  }

  .alarm {
    background: #EBFAF2;
    padding-right: 100px;
  }

  .el-row {
    // 
    // margin-left: 30px;
    margin-bottom: 10px;



    p {
      margin: 20px 0;
      margin-left: 30px;
    }
  }

  .typeBox {
    display: flex;

    .devicesType {
      width: 150px;
      height: 150px;
      // background: #EBFAF2;
      margin: 10px;
      text-align: center;
      padding: 1px;

      p {
        margin-top: 20px;
        font-size: 20px;
        color: #000;

        &:nth-child(2) {

          font-size: 28px;
          font-weight: bold;
        }
      }
    }
  }

  #echatsBox {
    height: 400px;
    // background: #bfa;
  }

}
</style>